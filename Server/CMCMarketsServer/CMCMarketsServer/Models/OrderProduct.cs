﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CMCMarketsServer.Models
{
    public class OrderProduct
    {
        [Key]
        public int OrderId { get; set; }
        public Order Order { get; set; }
        [Key]
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }
}
