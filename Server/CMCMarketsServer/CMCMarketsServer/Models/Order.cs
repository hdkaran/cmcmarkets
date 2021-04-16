using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CMCMarketsServer.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        //could be first name and last name
        public string CustomerName { get; set; }
        //could be further tied down to a model of location, but using string to keep it simple
        public string CustomerAddress { get; set; }
        public double ShippingPrice { get; set; }
        public double OrderTotal { get; set; }
        public bool OrderFinalized { get; set; }
        public List<OrderProduct> OrderedProducts { get; set; }
    }
}
