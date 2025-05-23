import React, { useState } from "react";
import { Modal } from "../ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, ChevronDown, Plus, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";

interface AddHealthCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  submitFunction?: (fields: Record<string, string>) => void;
}

const dropdownOptionsList = [
  { label: "Hemoglobin", value: "hemoglobin" },
  { label: "Blood Pressure", value: "blood_pressure" },
  { label: "Glucose", value: "glucose" },
  { label: "Temprature", value: "temprature" },
  { label: "Height", value: "height" },
  { label: "Weight", value: "weight" },
  { label: "SGPT", value: "sgpt" },
  { label: "SGOT", value: "sgot" },
  { label: "Urea", value: "urea" },
];

interface Field {
  key: string;
  value: string;
}

function AddHealthCheckModal({
  isOpen,
  onClose,
  submitFunction,
}: AddHealthCheckModalProps) {
  const [newField, setNewField] = React.useState<Field>({ key: "", value: "" });
  const [submittedFields, setSubmittedFields] = React.useState<
    Record<string, string>
  >({});
  const [error, setError] = React.useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [dropdownOptions, setDropdownOptions] =
    React.useState(dropdownOptionsList);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleNewFieldChange = (fieldType: keyof Field, value: string) => {
    setNewField((prev) => ({ ...prev, [fieldType]: value }));
  };

  const handleAddHealthCheck = () => {
    console.log("Adding health check:", newField);
    if (!newField.key || !newField.value) return;

    const isDuplicate = submittedFields.hasOwnProperty(newField.key);
    const findName = dropdownOptions.find(
      (option) => option.value === newField.key
    );

    if (isDuplicate) {
      setError(`"${findName?.label}" already has a value.`);
      setTimeout(() => setError(null), 3000);
      return;
    }

    setSubmittedFields((prev) => ({
      ...prev,
      [newField.key]: newField.value,
    }));

    setNewField({ key: "", value: "" });
    setSelectedValue(null);
    setOpen(false);
  };

  const handleDeleteField = (key: string) => {
    setSubmittedFields((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleSave = () => {
    if (submitFunction) {
      submitFunction(submittedFields);
    }

    toast({
      title: "Health Check Saved",
      description: "Your health check data has been saved.",
      duration: 2000,
    });
    onClose();
    setSubmittedFields({});
    setNewField({ key: "", value: "" });
  };

  return (
    <Modal
      title="Health Reports"
      description="Add a health reports for the patient"
      isOpen={isOpen}
      onClose={onClose}
      className="max-h-[90vh] sm:p-6 p-4"
    >
      <div className="w-full flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between text-left sm:w-[160px]"
              >
                {selectedValue
                  ? dropdownOptionsList.find(
                      (item) => item.value === selectedValue
                    )?.label
                  : "Select Option"}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command className="">
                <CommandInput placeholder="Search..." />
                <CommandEmpty>No reports found.</CommandEmpty>
                <CommandGroup>
                  {dropdownOptionsList.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(val) => {
                        setSelectedValue(val);
                        handleNewFieldChange("key", val);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          selectedValue === option.value
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Input
            type="text"
            placeholder="Value"
            className="w-full sm:w-[160px]"
            value={newField.value}
            onChange={(e) => handleNewFieldChange("value", e.target.value)}
          />

          <Button variant="outline" onClick={handleAddHealthCheck}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        {Object.keys(submittedFields).length === 0 && (
          <div className="text-gray-500 text-sm mt-2">
            No health checks added yet.
          </div>
        )}

        {Object.keys(submittedFields).length > 0 && <Separator />}

        <div className="w-full overflow-y-auto max-h-[250px]">
          {Object.entries(submittedFields).map(([key, value]) => {
            const label =
              dropdownOptions.find((opt) => opt.value === key)?.label || key;

            return (
              <div key={key} className="flex items-center gap-2 mb-4">
                <div className="w-full bg-slate-200/40 text-sm p-2 rounded">
                  {label}
                </div>
                <div className="w-full bg-slate-200/40 text-sm p-2 rounded">
                  {value}
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteField(key)}
                  className="ml-2 flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span className="text-red-500">Delete</span>
                </Button>
              </div>
            );
          })}
        </div>

        <hr />

        <Button
          className="self-end w-full sm:w-[120px]"
          variant="default"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}

export default AddHealthCheckModal;
