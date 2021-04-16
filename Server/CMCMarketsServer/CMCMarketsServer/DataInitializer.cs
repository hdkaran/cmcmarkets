using CMCMarketsServer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMCMarketsServer
{
    public class DataInitializer
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new CMCContext(
                serviceProvider.GetRequiredService<DbContextOptions<CMCContext>>()))
            {
                if (context.Products.Any())
                {
                    return;   
                }

                context.Products.AddRange(
                    new Product
                    {
                        ProductId=1,
                        ProductName="Cricket Bat",
                        ProductDescription="Wooden bat. Do you like that?",
                        Price=249.99,
                        ImageURL="/Images/bat.jpg"
                    }, new Product
                    {
                        ProductId = 2,
                        ProductName = "Cricket Ball",
                        ProductDescription = "Leather ball. Will make you fall.",
                        Price = 9.99,
                        ImageURL = "/Images/ball.png"
                    }
                    , new Product
                    {
                        ProductId = 3,
                        ProductName = "Cricket Pad",
                        ProductDescription = "Leather Pad. You wish you always had.",
                        Price = 129.99,
                        ImageURL = "/Images/pad.png"
                    }, new Product
                    {
                        ProductId = 4,
                        ProductName = "Cricket Gloves",
                        ProductDescription = "Premium Gloves. Everyone loves.",
                        Price = 11.99,
                        ImageURL = "/Images/gloves.jpg"
                    }, new Product
                    {
                        ProductId = 5,
                        ProductName = "Cricket Stumps",
                        ProductDescription = "Made of wood and steel. You won't get a better deal.",
                        Price = 149.99,
                        ImageURL = "/Images/stumps.jpg"
                    }, new Product
                    {
                        ProductId = 6,
                        ProductName = "Cricket Helmet",
                        ProductDescription = "Cricket Helmet. ... sorry we ran out of rhymes here...",
                        Price = 29.99,
                        ImageURL = "/Images/helmet.jpg"
                    });

                context.SaveChanges();
            }
        }
    }
}
