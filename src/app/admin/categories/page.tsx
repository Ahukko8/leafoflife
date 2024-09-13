"use client";

import { useState, useEffect } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

export default function CategoriesPage() {
  const [name, setName] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      setError("Failed to fetch categories.");
    }
  };

  const addOrUpdateCategory = async () => {
    setError(null);
    setSuccessMessage(null);

    try {
      const url = editingId ? `/api/categories/${editingId}` : "/api/categories";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setName("");
        setEditingId(null);
        setSuccessMessage(editingId ? "Category updated successfully!" : "Category added successfully!");
        fetchCategories();
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Error processing category");
      }
    } catch (err) {
      setError("Failed to process category.");
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccessMessage("Category deleted successfully!");
        fetchCategories();
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to delete category.");
      }
    } catch (err) {
      setError("Failed to delete category.");
    }
  };

  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setName(category.name);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Manage Categories</h1>
      <div className="space-y-2">
        <Label htmlFor="category-name">Category Name</Label>
        <Input
          type="text"
          id="category-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {error && <div className="text-destructive">{error}</div>}
        {successMessage && <div className="text-primary-leaf">{successMessage}</div>}
      </div>
      <Button onClick={addOrUpdateCategory}>
        {editingId ? "Update Category" : "Add Category"}
      </Button>
      {editingId && (
        <Button variant="outline" onClick={() => { setEditingId(null); setName(""); }}>
          Cancel Edit
        </Button>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => startEditing(category)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => deleteCategory(category.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}