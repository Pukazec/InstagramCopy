using InstagramCopy.Data;
using InstagramWorker;
using InstagramWorker.Options;
using Microsoft.EntityFrameworkCore;

var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((hostContext, serviecs) =>
    {
        serviecs.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(hostContext.Configuration.GetConnectionString("DefaultConnection")));

        serviecs.Configure<WorkerOptions>(hostContext.Configuration.GetSection(WorkerOptions.SectionName));
        serviecs.AddHostedService<InstagramWorkerService>();
    })
    .ConfigureLogging(logging =>
    {
        logging.ClearProviders();
        logging.AddConsole();
    })
    .UseWindowsService()
    .Build();


await host.RunAsync();
