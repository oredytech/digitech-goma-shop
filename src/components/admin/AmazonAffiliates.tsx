
import React, { useState } from 'react';
import { ExternalLink, Plus, Edit, Trash2, Link, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/context/ProductsContext';
import { AffiliateModal } from './modals/AffiliateModal';
import { DeleteConfirmModal } from './modals/DeleteConfirmModal';
import { Product } from '@/data/products';

const AmazonAffiliates = () => {
  const { products, updateProduct, deleteProduct } = useProducts();
  const [affiliateModal, setAffiliateModal] = useState<{
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

  // Filtrer uniquement les produits Amazon
  const amazonProducts = products.filter(product => product.isAmazonAffiliate);

  // Calculer les statistiques
  const totalAffiliateProducts = amazonProducts.length;
  const inStockAffiliates = amazonProducts.filter(p => p.inStock).length;

  const handleEdit = (product: Product) => {
    setAffiliateModal({
      isOpen: true,
      mode: 'edit',
      product,
    });
  };

  const handleDelete = (product: Product) => {
    setDeleteModal({
      isOpen: true,
      product,
    });
  };

  const confirmDelete = () => {
    if (deleteModal.product) {
      deleteProduct(deleteModal.product.id);
    }
    setDeleteModal({ isOpen: false });
  };

  const handleSaveAffiliate = (productData: Omit<Product, 'id'>) => {
    if (affiliateModal.product) {
      updateProduct(affiliateModal.product.id, productData);
    }
    setAffiliateModal({ isOpen: false, mode: 'add' });
  };

  const openAmazonUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Affiliations Amazon</h1>
        <Button 
          className="bg-[#FF9900] hover:bg-[#FF9900]/90 text-black font-medium"
          onClick={() => setAffiliateModal({ isOpen: true, mode: 'add' })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau lien d'affiliation
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Affiliations</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAffiliateProducts}</div>
            <p className="text-xs text-muted-foreground">
              Produits avec liens Amazon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actifs</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStockAffiliates}</div>
            <p className="text-xs text-muted-foreground">
              Liens actifs en stock
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'activité</CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalAffiliateProducts > 0 ? Math.round((inStockAffiliates / totalAffiliateProducts) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Produits actifs / total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table des affiliations */}
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Liens d'Affiliation</CardTitle>
          <CardDescription>
            Gérez vos produits avec des liens d'affiliation Amazon
          </CardDescription>
        </CardHeader>
        <CardContent>
          {amazonProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ExternalLink className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-center text-gray-500 mb-4">
                Aucun produit avec lien d'affiliation Amazon trouvé.
              </p>
              <Button 
                className="bg-[#FF9900] hover:bg-[#FF9900]/90 text-black font-medium"
                onClick={() => setAffiliateModal({ isOpen: true, mode: 'add' })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter le premier lien
              </Button>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Lien Amazon</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amazonProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
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
                          <Badge className="bg-green-500">Actif</Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-500 border-red-500">Inactif</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {product.amazonUrl ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openAmazonUrl(product.amazonUrl!)}
                            className="text-[#FF9900] border-[#FF9900] hover:bg-[#FF9900] hover:text-black"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Voir
                          </Button>
                        ) : (
                          <span className="text-gray-400">Non configuré</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
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
          )}
        </CardContent>
      </Card>

      {/* Modales */}
      <AffiliateModal
        isOpen={affiliateModal.isOpen}
        onClose={() => setAffiliateModal({ isOpen: false, mode: 'add' })}
        onSave={handleSaveAffiliate}
        product={affiliateModal.product}
        mode={affiliateModal.mode}
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

export default AmazonAffiliates;
