using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly ProductStore _store;

    public ProductsController(ProductStore store)
    {
        _store = store;
    }

    [HttpPost]
    public IActionResult Create(CreateProductRequest request)
    {
        var errors = ValidateCreateProductRequest(request);
        if (errors.Any())
            return BadRequest(new { Errors = errors });

        var product = new Product
        {
            Id = _store.GetNextId(),
            Name = request.Name,
            Sku = request.Sku,
            Price = request.Price,
            Stock = request.Stock,
            Category = request.Category,
            CreatedAt = DateTime.UtcNow
        };

        _store.Products.Add(product);

        return Created("", product);
    }

    [HttpGet]
    public IActionResult GetAll([FromQuery] string? category)
    {
        var products = _store.Products.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(category))
        {
            products = products.Where(p => p.Category.Equals(category, StringComparison.OrdinalIgnoreCase));
        }

        return Ok(products);
    }

    [HttpPost("sell")]
    public IActionResult Sell(SellProductRequest request)
    {
        if (request.Quantity <= 0)
            return BadRequest(new { errors = new[] { "Sale quantity must be more than zero." } });
        
        var product = _store.Products.FirstOrDefault(p => p.Id == request.ProductId);
        if (product == null)
            return NotFound(new { errors = new[] { "Product not found." } });

        if (product.Stock < request.Quantity)
        {
            return BadRequest(new { errors = new[] { "Insufficient stock." } });
        }

        product.Stock -= request.Quantity;

        return Ok(product);
    }

    private List<string> ValidateCreateProductRequest(CreateProductRequest request)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(request.Name))
            errors.Add("Product name is required.");

        if (string.IsNullOrWhiteSpace(request.Sku) || request.Sku.Length < 3)
            errors.Add("SKU must be at least 3 characters long.");

        if (_store.Products.Any(p => p.Sku.Equals(request.Sku, StringComparison.OrdinalIgnoreCase)))
            errors.Add("SKU must be unique.");
        
        if (request.Price <= 0)
            errors.Add("Price must be more than zero.");
        
        if (request.Stock < 0)
            errors.Add("Stock cannot be negative.");

        var categories = new[] { "Food", "Beverage", "PersonalItems", "Clothing" };
        if (!categories.Contains(request.Category))
            errors.Add($"Category must be one of the following: {string.Join(", ", categories)}.");

        return errors;
    }
}