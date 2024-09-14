using InstagramCopy.Data;
using InstagramCopy.Data.Factory;
using InstagramCopy.Middleware;
using InstagramCopy.Models.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Prometheus;
using Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
    sqlServerOptionsAction: sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(10),
            errorNumbersToAdd: null);
    }));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
})
.AddGitHub(options =>
{
    options.ClientId = builder.Configuration["Authentication:GitHub:ClientId"];
    options.ClientSecret = builder.Configuration["Authentication:GitHub:ClientSecret"];
});

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var settings = new InstagramCopySetupSettings();

settings.ConfigureMediatR(builder.Services, builder.Configuration);
settings.ConfigureValidator(builder.Services);
settings.ConfigureAutoMapper(builder.Services);

var pictureFactoryOptions = builder.Configuration.GetSection(PictureFactoryOptions.SectionName).Get<PictureFactoryOptions>();
builder.Services.AddScoped(
    sp =>
    new FileSystemPictureFactory(
        pictureFactoryOptions.RootFileSystemFolder)
    );

builder.Services.AddSingleton<MongoDbService>();
builder.Services.AddScoped<MongoPictureFactory>();

if (pictureFactoryOptions?.SelectedFactory == FactoryType.FileSystem)
{
    builder.Services.AddScoped<IPictureFactory>(sp =>
        sp.GetRequiredService<FileSystemPictureFactory>());
}
else if (pictureFactoryOptions?.SelectedFactory == FactoryType.MongoDb)
{
    builder.Services.AddScoped<IPictureFactory>(sp =>
        sp.GetRequiredService<MongoPictureFactory>());
}
else
{
    throw new InvalidOperationException("Invalid or missing PictureFactoryOptions SelectedFactory in configuration");
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    IdentityModelEventSource.ShowPII = true;
}
else
{
    app.UseExceptionHandler(appBuilder =>
    {
        appBuilder.Run(async context =>
        {
            var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
            if (exceptionHandlerFeature != null)
            {
                var exception = exceptionHandlerFeature.Error;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(exception.Message);
            }

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsync("An unexpected fault occurred. Try again later.");
        });
    });
}

app.UseCors();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseInstagramLogging();

app.UseHttpMetrics();

app.MapMetrics();
app.MapControllers();

await app.RunAsync();

public partial class Program { }