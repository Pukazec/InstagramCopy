using Domain.Data.Models.DbModels;
using InstagramCopy.Data;
using System.Security.Claims;
using System.Text;

namespace InstagramCopy.Middleware
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public LoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, ApplicationDbContext dbContext)
        {
            var username = context.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name);

            using var bodyReader = new StreamReader(
                context.Request.Body,
                Encoding.UTF8,
                detectEncodingFromByteOrderMarks: false,
                bufferSize: 1024,
                leaveOpen: true);
            var requestBody = await bodyReader.ReadToEndAsync();

            var queryParams = new StringBuilder();

            foreach (var param in context.Request.Query)
            {
                queryParams.Append($"{param.Key}={param.Value}&");
            }

            if (queryParams.Length > 0)
            {
                queryParams.Length--;
            }

            var instagramLog = new InstagramLog()
            {
                UserName = username?.Value,
                OccurredAt = DateTime.UtcNow,
                Operation = context.Request.Path,
                RequestQuery = queryParams.ToString(),
                RequestBody = requestBody,
            };

            dbContext.InstagramLogs.Add(instagramLog);
            await dbContext.SaveChangesAsync();

            await _next(context);
        }
    }

    public static class LoggingMiddlewareExtensions
    {
        public static IApplicationBuilder UseInstagramLogging(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<LoggingMiddleware>();
        }
    }
}

