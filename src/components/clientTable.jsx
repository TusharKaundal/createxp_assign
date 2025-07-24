import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { availableFields } from "@/lib/constant";

export function ClientTable({ clients }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50">
            {availableFields.map((item) => (
              <TableHead key={item.field} className="font-medium">
                {item.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="hover:bg-gray-50/50">
              <TableCell className="font-medium text-blue-600">
                {client.id}
              </TableCell>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell className="text-gray-600">{client.type}</TableCell>
              <TableCell className="text-gray-600">{client.email}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <Badge
                    variant="secondary"
                    className={getStatusColor(client.status)}
                  >
                    {client.status}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-gray-600">
                {formatDate(client.createdAt)}
              </TableCell>
              <TableCell className="text-gray-600">
                {formatDate(client.updatedAt)}
              </TableCell>
              <TableCell className="text-gray-600">
                {client.updatedBy}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
