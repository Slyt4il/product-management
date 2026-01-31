public class ProductStore
{
    private readonly List<Product> _products = new();
    private int _nextId = 1;

    public List<Product> Products => _products;
    public int GetNextId() => _nextId++;
}