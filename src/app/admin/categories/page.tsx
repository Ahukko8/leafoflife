// "use client";

// import { useState } from "react";
// import { Input } from "@/src/components/ui/input";
// import { Label } from "@/src/components/ui/label";
// import { Button } from "@/src/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function CategoriesPage() {
//   const [name, setName] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const addCategory = async () => {
//     try {
//       const res = await fetch("/api/categories", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name }),
//       });

//       if (res.ok) {
//         setName(""); // Reset the form
//         router.refresh(); // Refresh the page to show updated categories
//       } else {
//         const errorData = await res.json();
//         setError(errorData.message || "Error adding category");
//       }
//     } catch (err) {
//       setError("Failed to add category.");
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold">Add Category</h1>
//       <div className="space-y-2">
//         <Label htmlFor="category-name">Category Name</Label>
//         <Input
//           type="text"
//           id="category-name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         {error && <div className="text-destructive">{error}</div>}
//       </div>
//       <Button onClick={addCategory}>Add Category</Button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // For success message
  const router = useRouter();

  const addCategory = async () => {
    setError(null); // Clear previous errors
    setSuccessMessage(null); // Clear previous success messages

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setName(""); // Reset the form
        setSuccessMessage("Category added successfully!"); // Set success message
        router.refresh(); // Refresh the page to show updated categories
      } else {
        const errorData = await res.json();
        if (errorData.message === "Category already exists") {
          setError("Category already exists"); // Specific error for duplicates
        } else {
          setError(errorData.message || "Error adding category");
        }
      }
    } catch (err) {
      setError("Failed to add category.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add Category</h1>
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
        {successMessage && <div className="text-success text-primary-leaf">{successMessage}</div>} {/* Success message */}
      </div>
      <Button onClick={addCategory}>Add Category</Button>
    </div>
  );
}
