import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { client } from "@/lib/db/postgres";
import { Label } from "../ui/label";

type Category = {
  id: string;
  name: string;
};

// Function to fetch stores from the database
async function fetchCategories(): Promise<Category[]> {
  // const categories = await client`
  //   SELECT id, name
  //   FROM item_category
  // `;
  // return categories as unknown as Category[];
  return [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Furniture" },
    { id: "3", name: "Books" },
    { id: "4", name: "Clothing" },
    { id: "5", name: "Toys" },
    { id: "6", name: "Groceries" },
  ];
}

// CategorySelect component to dynamically render store options
export async function CategorySelect({ name }: { name: string }) {
  const stores = await fetchCategories();

  return (
    <div>
      <Label className="text-gray-700 font-semibold mb-1">Category</Label>
      <Select name={name} required>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Store</SelectLabel>
            {stores.map((store) => (
              <SelectItem key={store.id} value={store.id}>
                {store.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
