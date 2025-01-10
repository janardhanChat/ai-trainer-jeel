// import { Select, SelectContent, SelectTrigger, SelectItem } from '../ui/select';

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";

export default function SelectDevice({ value, devices, onChange, Icon }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 rounded-md gap-2 bg-slate-500/70 text-white">
        <span>
          <Icon size={16} />
        </span>
      </SelectTrigger>
      <SelectContent className="z-10 bg-custom-gradient text-white font-semibold">
        {devices.map(({ device }) => (
          <SelectItem key={device.deviceId} value={device.deviceId}>
            {device.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
