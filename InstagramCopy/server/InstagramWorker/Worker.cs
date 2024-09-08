using InstagramCopy.Data;
using InstagramWorker.Aspects;
using InstagramWorker.Options;
using Microsoft.Extensions.Options;

namespace InstagramWorker
{
    public class InstagramWorkerService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<InstagramWorkerService> _logger;
        private readonly WorkerOptions _options;

        public InstagramWorkerService(
            ILogger<InstagramWorkerService> logger,
            IServiceProvider serviceProvider,
            IOptions<WorkerOptions> options)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
            _options = options.Value;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogServiceStart("Services Worker");

            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            DbContextProvider.DbContext = dbContext;

            try
            {
                _logger.LogRunningMessage("Services Worker");

                while (!stoppingToken.IsCancellationRequested)
                {
                    // Calculate the delay until the next full minute
                    var currentTime = DateTime.Now.TimeOfDay;
                    var nextRunTime = _options.ResetTime;

                    if (currentTime > nextRunTime)
                    {
                        nextRunTime = nextRunTime.Add(TimeSpan.FromDays(1));
                    }

                    var delay = nextRunTime - currentTime;

                    await Task.Delay(delay, stoppingToken);

                    if (stoppingToken.IsCancellationRequested)
                    {
                        break;
                    }

                    _logger.LogNextRunMessage("Services Worker", DateTime.UtcNow);
                    await DoWork(stoppingToken);

                    await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
                }
            }
            finally
            {
                _logger.LogServiceStop("Services Worker");
            }
        }

        [LogMethodAspect]
        private async Task DoWork(CancellationToken cancellationToken)
        {
            var now = DateTime.Now;

            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            var users = dbContext.Users;

            foreach (var user in users)
            {
                user.TodayUploadCount = 0;
                if (user.SubscriptionPlan != user.DesiredSubscriptionPlan)
                {
                    user.SubscriptionPlan = user.DesiredSubscriptionPlan;
                }
            }

            await dbContext.SaveChangesAsync(cancellationToken);

            _logger.LogNextRunMessage("Worker Jobs", now.AddDays(1));
        }
    }
}
