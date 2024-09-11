"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct, updateProduct, FormErrors } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product, Category } from "@prisma/client";
import Image from "next/image";

type FormState = FormErrors | { error: string } | {};

export function ProductForm({
  product,
  categories,
}: {
  product?: Product | null;
  categories: Category[];
}) {
  const [error, action] = useFormState<FormState, FormData>(
    product == null
      ? addProduct
      : (prevState: FormState, formData: FormData) =>
          updateProduct(product.id, prevState, formData),
    {}
  );

  const [priceInCents, setPriceInCents] = useState<string>(
    product?.priceInCents?.toString() || ""
  );

  const isFormErrors = (err: FormState): err is FormErrors => {
    return typeof err === "object" && err !== null && !("error" in err);
  };

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {isFormErrors(error) && error.name && (
          <p className="text-destructive">{error.name[0]}</p>
        )}{" "}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(e.target.value)}
        />
        <div className="text-muted-foreground">
        {formatCurrency(Number(priceInCents) || 0)}
        </div>
        {isFormErrors(error) && error.priceInCents && (
          <p className="text-destructive">{error.priceInCents[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description || ""}
        />
        {!isFormErrors(error) && "error" in error && (
          <p className="text-destructive">{error.error}</p>
        )}{" "}
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select name="categoryId" defaultValue={product?.categoryId || ""}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isFormErrors(error) && error.file && (
          <p className="text-destructive">{error.file[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required={product === null} />
        {product != null && (
          <p className="text-muted-foreground">{product.filePath}</p>
        )}
        {isFormErrors(error) && error.image && (
          <p className="text-destructive">{error.image[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          type="file"
          id="image"
          name="image"
          required={product === null}
        />
        {product != null && product.imagePath && (
          <Image
            src={product.imagePath}
            height="200"
            width="200"
            alt="product"
          />
        )}
        {!isFormErrors(error) && "error" in error && (
          <p className="text-destructive">{error.error}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="bg-lime-700 hover:bg-lime-700/85"
      disabled={pending}
    >
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
