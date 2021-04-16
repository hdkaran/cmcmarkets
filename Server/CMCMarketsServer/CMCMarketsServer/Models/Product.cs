using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CMCMarketsServer.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public double Price { get; set; }
        public string ImageURL { get; set; }
        //orders where this product appears
        public List<OrderProduct> ProductOrders { get; set; }
    }
}
