using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMCMarketsServer.Models;

namespace CMCMarketsServer.Controllers.Order
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly CMCContext _context;

        public OrdersController(CMCContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Order>>> GetOrders()
        {
            return await _context.Orders.Include(x=>x.OrderedProducts).ThenInclude(x=>x.Product).ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Order>> GetOrder(int id)
        {
            var order = await _context.Orders.Include(x => x.OrderedProducts).ThenInclude(x=>x.Product).Where(x=>x.OrderId==id).FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Models.Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Models.Order>> PostOrder(Models.Order order)
        {
            if(order!=null)
            {
                order.ShippingPrice = GetOrderShippingPrice(order);
                order.OrderTotal = GetOrderTotal(order);
            }
            _context.Orders.Add(order);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }
        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch("{id:int}")]
        public async Task<ActionResult<Models.Order>> PatchOrder(int id, Models.Order order)
        {
            if (order != null)
            {
                order.OrderFinalized = true;
            }
            _context.Orders.Update(order);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }
        private double GetOrderTotal(Models.Order order)
        {
            double orderCost = 0;
            if (order == null)
                return 0;
            foreach (var product in order.OrderedProducts)
            {
                var prod = _context.Products.Find(product.ProductId);
                orderCost = orderCost + (prod.Price * product.Quantity);
            }
            return orderCost+order.ShippingPrice;
        }
        private double GetOrderShippingPrice(Models.Order order)
        {
            double orderCost=0;
            if (order == null)
                return 0;
            foreach(var product in order.OrderedProducts)
            {
                var prod = _context.Products.Find(product.ProductId);
                orderCost = orderCost + (prod.Price * product.Quantity);
            }
            if (orderCost <= 50)
                return 10.0;
            else
                return 20.0;

        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
