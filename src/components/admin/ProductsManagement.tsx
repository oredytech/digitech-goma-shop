
import React from 'react';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye, 
  EyeOff, 
  ExternalLink 
} from 'lucide-react';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const ProductsManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des Produits</h1>
        <Button className="bg-digitech-orange hover:bg-digitech-orange/90">
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
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Tous</Button>
          <Button variant="outline">En Stock</Button>
          <Button variant="outline">Hors Stock</Button>
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
            {products.map((product) => (
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
                    <Button size="icon" variant="ghost">
                      {product.inStock ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsManagement;
