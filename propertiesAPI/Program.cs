using System;
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000", "*/*");
                      });
});

// services.AddResponseCaching();

builder.Services.AddControllers();

var app = builder.Build();
app.UseHttpsRedirection();


app.UseCors(MyAllowSpecificOrigins);


app.UseHttpsRedirection();



app.MapGet("/properties", async (HttpRequest request) =>
{
    var propertyType = request.Query["propertyType"].ToString();
    var viewportString = request.Query["viewport"].ToString();

    List<float> viewport = new List<float>();
    if (!string.IsNullOrEmpty(viewportString))
    {
        viewport = Array.ConvertAll(viewportString.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries),
                       x => float.Parse(x)).ToList();
    }

    if (!(string.IsNullOrEmpty(propertyType) || propertyType == "Apartment" || propertyType == "House"))
    {
        return Results.Problem("Invalid property type:" + propertyType);
    }
    if (!string.IsNullOrEmpty(viewportString) && !(viewport.Count == 0 || viewport.Count == 4))
    {
        return Results.Problem("Invalid viewport:" + viewportString);
    }

    var properties = await JsonFileReader.ReadAsync<Property[]>("./properties.json");
    var filtered = properties;

    if (propertyType != "")
    {
        filtered = filtered.Where(property => property.RealEstateType == propertyType).ToArray();
    }
    if (viewport.Count == 4)
    {
        filtered = filtered.Where(property => IsInside(property, viewport)).ToArray();
    }


    return Results.Ok(filtered);
});


app.Run("https://localhost:8000");


bool IsInside(Property property, List<float> viewport) =>
    property.Latitude > viewport[0] && property.Longitude > viewport[1] && property.Latitude < viewport[2] && property.Longitude < viewport[3];


public static class JsonFileReader
{
    public static async Task<T> ReadAsync<T>(string filePath)
    {
        using FileStream stream = File.OpenRead(filePath);
        return await JsonSerializer.DeserializeAsync<T>(stream);
    }
}

public class Property
{
    public string Title { get; set; }
    public string RealEstateType { get; set; }
    public string StreetName { get; set; }
    public string StreetNumber { get; set; }
    public string Zip { get; set; }
    public string City { get; set; }

    public float Latitude { get; set; }
    public float Longitude { get; set; }
}
