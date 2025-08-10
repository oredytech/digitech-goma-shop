
import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye, 
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/context/ProductsContext';
import { ProductModal } from './modals/ProductModal';
import { DeleteConfirmModal } from './modals/DeleteConfirmModal';
import { Product } from '@/data/products';

const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [productModal, setProductModal] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    product?: Product;
  }>({
    isOpen: false,
    mode: 'add',
  });
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    product?: Product;
  }>({
    isOpen: false,
  });

  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductVisibility 
  } = useProducts();

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === "all") return matchesSearch;
    if (filter === "inStock") return matchesSearch && product.inStock;
    if (filter === "outOfStock") return matchesSearch && !product.inStock;
    return matchesSearch;
  });

  // Gérer la recherche
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Gérer le filtre
  const handleFilter = (filterType: string) => {
    setFilter(filterType);
  };

  // Gérer l'ajout d'un nouveau produit
  const handleAddProduct = () => {
    setProductModal({
      isOpen: true,
      mode: 'add',
    });
  };

  // Gérer la modification du produit
  const handleEdit = (product: Product) => {
    setProductModal({
      isOpen: true,
      mode: 'edit',
      product,
    });
  };

  // Gérer la suppression du produit
  const handleDelete = (product: Product) => {
    setDeleteModal({
      isOpen: true,
      product,
    });
  };

  // Confirmer la suppression
  const confirmDelete = () => {
    if (deleteModal.product) {
      deleteProduct(deleteModal.product.id);
    }
    setDeleteModal({ isOpen: false });
  };

  // Sauvegarder un produit (ajout ou modification)
  const handleSaveProduct = (productData: Omit<Product, 'id'>) => {
    if (productModal.mode === 'add') {
      addProduct(productData);
    } else if (productModal.product) {
      updateProduct(productModal.product.id, productData);
    }
    setProductModal({ isOpen: false, mode: 'add' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des Produits</h1>
        <Button 
          className="bg-digitech-orange hover:bg-digitech-orange/90"
          onClick={handleAddProduct}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un Produit
        </Button>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher un produit..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => handleFilter("all")}
          >
            Tous
          </Button>
          <Button 
            variant={filter === "inStock" ? "default" : "outline"}
            onClick={() => handleFilter("inStock")}
          >
            En Stock
          </Button>
          <Button 
            variant={filter === "outOfStock" ? "default" : "outline"}
            onClick={() => handleFilter("outOfStock")}
          >
            Hors Stock
          </Button>
        </div>
      </div>
      
      {/* Products Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Nom du Produit</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Affilié Amazon</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell>
                  {product.discountPrice ? (
                    <div>
                      <span className="line-through text-gray-400">${product.price}</span>
                      <span className="ml-2 text-digitech-orange font-medium">${product.discountPrice}</span>
                    </div>
                  ) : (
                    <span>${product.price}</span>
                  )}
                </TableCell>
                <TableCell>
                  {product.inStock ? (
                    <Badge className="bg-green-500">En Stock</Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-500 border-red-500">Hors Stock</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {product.isAmazonAffiliate ? (
                    <Badge className="bg-blue-500">Oui</Badge>
                  ) : (
                    <Badge variant="outline">Non</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => toggleProductVisibility(product.id)}
                    >
                      {product.inStock ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(product)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modales */}
      <ProductModal
        isOpen={productModal.isOpen}
        onClose={() => setProductModal({ isOpen: false, mode: 'add' })}
        onSave={handleSaveProduct}
        product={productModal.product}
        mode={productModal.mode}
      />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={confirmDelete}
        productName={deleteModal.product?.name || ''}
      />
    </div>
  );
};

export default ProductsManagement;
