using FluentValidation;
using InstagramCopy.Data;
using InstagramCopy.Data.Factory;
using InstagramCopy.Models.Identity;
using InstagramCopy.Services.Behaviours;
using MediatR;
using MediatR.Pipeline;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

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
.AddGoogle(options =>
{
    IConfigurationSection googleAuthNSection =
        builder.Configuration.GetSection("Authentication:Google");

    options.ClientId = googleAuthNSection["ClientId"];
    options.ClientSecret = googleAuthNSection["ClientSecret"];
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

builder.Services.AddMediatR(config =>
{
    config.AutoRegisterRequestProcessors = true;
    config.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly());
    config.AddOpenBehavior(typeof(RequestPreProcessorBehavior<,>));
    config.AddOpenBehavior(typeof(RequestPostProcessorBehavior<,>));
});
builder.Services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
ValidatorOptions.Global.DefaultClassLevelCascadeMode = CascadeMode.Stop;
ValidatorOptions.Global.DefaultRuleLevelCascadeMode = CascadeMode.Stop;

builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly(), includeInternalTypes: true);
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

var pictureFactoryOptions = builder.Configuration.GetSection(PictureFactoryOptions.SectionName).Get<PictureFactoryOptions>();
if (pictureFactoryOptions?.SelectedFactory == FactoryType.FileSystem)
{
    builder.Services.AddSingleton(sp =>
        new FileSystemPictureFactory(
            pictureFactoryOptions.RootFileSystemFolder,
            sp.GetRequiredService<UserManager<ApplicationUser>>()));
    builder.Services.AddSingleton<IPictureFactory>(sp =>
        sp.GetRequiredService<FileSystemPictureFactory>());
}
else if (pictureFactoryOptions?.SelectedFactory == FactoryType.MongoDb)
{
    builder.Services.AddSingleton<MongoDbService>();
    builder.Services.AddSingleton<MongoPictureFactory>();
    builder.Services.AddSingleton<IPictureFactory>(sp =>
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
}

app.UseCors();

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

await app.RunAsync();
