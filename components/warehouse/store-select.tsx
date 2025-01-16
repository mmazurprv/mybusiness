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

type Store = {
  id: string;
  name: string;
};

// Function to fetch stores from the database
async function fetchStores(): Promise<Store[]> {
  // const stores = await client`
  //   SELECT id, name
  //   FROM store
  // `;
  // return stores as unknown as Store[];
  return [
    { id: "1", name: "Attic" },
    { id: "2", name: "Office" },
  ];
}

// StoreInput component to dynamically render store options
export async function StoreSelect({ name }: { name: string }) {
  const stores = await fetchStores();

  return (
    <div>
      <Label className="text-gray-700 font-semibold mb-1">Store</Label>
      <Select name={name} required>
        <SelectTrigger>
          <SelectValue placeholder="Select a store" />
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
