using FluentValidation;
using InstagramCopy.Services.Behaviours;
using MediatR;
using MediatR.Pipeline;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Services
{
    public class InstagramCopySetupSettings
    {
        public virtual IServiceCollection ConfigureMediatR(IServiceCollection services, IConfiguration configuration)
        {
            services.AddMediatR(config =>
            {
                config.AutoRegisterRequestProcessors = true;
                config.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly());
                config.AddOpenBehavior(typeof(ValidationBehaviour<,>));
                config.AddOpenBehavior(typeof(RequestPreProcessorBehavior<,>));
                config.AddOpenBehavior(typeof(RequestPostProcessorBehavior<,>));
            });

            return services;
        }

        public virtual IServiceCollection ConfigureValidator(IServiceCollection services)
        {
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
            ValidatorOptions.Global.DefaultClassLevelCascadeMode = CascadeMode.Stop;
            ValidatorOptions.Global.DefaultRuleLevelCascadeMode = CascadeMode.Stop;

            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly(), includeInternalTypes: true);

            return services;
        }

        public virtual IServiceCollection ConfigureAutoMapper(IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
