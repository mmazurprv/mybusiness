import { addItem } from "@/lib/actions/add-item";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { StoreSelect } from "./store-select";
import BarcodeInput from "./barcode-input";
import TitleInput from "./title-input";
import BrandInput from "./brand-input";
import { CategorySelect } from "./category-select";
import QuantityInput from "./quantity-input";
import { Input } from "../ui/input";

export default function AddItemForm() {
  return (
    <form action={addItem} className="space-y-4">
      <TitleInput name="title" />
      <BarcodeInput name="barcode" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <CategorySelect name="category-id" />
        </div>
        <div>
          <StoreSelect name="store-id" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <BrandInput name="brand" />
        </div>
        <div>
          <QuantityInput name="quantity" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-700 font-semibold mb-1">
            Warranty start
          </Label>
          <Input type="date" name="warranty-start" />
        </div>
        <div>
          <Label className="text-gray-700 font-semibold mb-1">
            Warranty end
          </Label>
          <Input type="date" name="warranty-end" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-700 font-semibold mb-1">
            Invoice number
          </Label>
          <Input type="text" name="invoice-number" />
        </div>
        <div>
          <Label className="text-gray-700 font-semibold mb-1">
            Invoice supplier code
          </Label>
          <Input type="text" name="invoice-supplier-code" />
        </div>
      </div>

      <div>
        <Label className="text-gray-700 font-semibold mb-1">
          Additional informations
        </Label>
        <Input type="text" name="memo" />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="mt-4 w-full">
        Add Item
      </Button>
    </form>
  );
}
