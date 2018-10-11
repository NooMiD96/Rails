using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using CoreReactReduxTypeScript.Contexts.ProjectTodoIdentity;
using CoreReactReduxTypeScript.Contexts.ProjectTodo;
using CoreReactReduxTypeScript.Models.ProjectTodoIdentity;
using static CoreReactReduxTypeScript.DIServices.DependencyInjections;
using CoreReactReduxTypeScript.DIServices;

namespace CoreReactReduxTypeScript
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ProjectTodoIdentityContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("Identity"));
            });
            services.AddDbContext<ProjectTodoContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("Fetcher"));
            });

            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.Password.RequiredLength         = 1;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase       = false;
                options.Password.RequireUppercase       = false;
                options.Password.RequireDigit           = false;

                options.User.RequireUniqueEmail         = true;

                options.Lockout.DefaultLockoutTimeSpan  = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;
                options.Lockout.AllowedForNewUsers      = true;
            })
                .AddEntityFrameworkStores<ProjectTodoIdentityContext>();

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly         = true;
                options.ExpireTimeSpan          = TimeSpan.FromMinutes(30);
                options.SlidingExpiration       = true;
                options.ReturnUrlParameter      = "";
                options.LoginPath               = "";
                options.AccessDeniedPath        = "";
            });

            services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, ClaimsPrincipalFactoryDI>();

            services.AddResponseCompression();

            var serviceProvider = services.BuildServiceProvider();

            // We cant start the both DI together 'couse we have a reference from Project to Identity context
            //Task.WhenAll(
            //    ProjectTodoDataBase(serviceProvider, Configuration),
            //    IdentityDataBase(serviceProvider, Configuration)
            //).GetAwaiter().GetResult();

            IdentityDataBase(serviceProvider, Configuration).GetAwaiter().GetResult();
            ProjectTodoDataBase(serviceProvider, Configuration).GetAwaiter().GetResult();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = Configuration.GetValue<string>("SpaPhysicalStaticPath");
            });

            StartUpVendors.Configuration = Configuration;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacementClientOptions   = new Dictionary<string, string> { { "dynamicPublicPath", "false" } },
                    ProjectPath                         = Path.Combine(Directory.GetCurrentDirectory(), Configuration.GetValue<string>("SpaPhysicalRootPath")),
                    HotModuleReplacement                = true,
                    ReactHotModuleReplacement           = true
                });
            }

            app.UseResponseCompression();

            app.UseSpaStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
