using Microsoft.EntityFrameworkCore;
using PacientesAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var cn = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'Default Connection' not found.");
builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseMySql(cn, ServerVersion.AutoDetect(cn)));

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApiDbContext>();
    context.Database.EnsureCreated();

    if (!context.Usuarios.Any())
    {
        context.Usuarios.Add(new Usuario
        {
            Nombre = "Admin",
            Email = "admin@gmail.com",
            Contrasenia = BCrypt.Net.BCrypt.HashPassword("admin1234")
        });
        context.SaveChanges();
    }
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
