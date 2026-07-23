import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader as Loader2 } from "lucide-react";

const CATEGORIES = [
  { value: "wedding", label: "Wedding" },
  { value: "engagement", label: "Engagement" },
  { value: "birthday", label: "Birthday" },
  { value: "baby_shower", label: "Baby Shower" },
];

export function AdminImageUpload({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
  const [category, setCategory] = useState("");
  const [altText, setAltText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !category) {
      toast({
        title: "Missing fields",
        description: "Please select a file and category",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filename, file);

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from("portfolio")
        .getPublicUrl(filename);

      const { error: dbError } = await supabase.from("portfolio_images").insert({
        category,
        image_url: publicUrl.publicUrl,
        alt_text: altText,
        order_index: 0,
        created_by: (await supabase.auth.getUser()).data.user?.id,
      });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      setFile(null);
      setCategory("");
      setAltText("");
      onUploadSuccess?.();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4 p-4 border rounded-lg">
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="altText">Image Description (Optional)</Label>
        <Input
          id="altText"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="e.g., Reception Dance"
        />
      </div>

      <div>
        <Label htmlFor="file">Image File</Label>
        <Input
          id="file"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          disabled={uploading}
        />
      </div>

      <Button type="submit" disabled={uploading} className="w-full">
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          "Upload Image"
        )}
      </Button>
    </form>
  );
}
