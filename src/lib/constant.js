export const availableFields = [
  { field: "name", label: "Client Name" },
  { field: "createdAt", label: "Created At" },
  { field: "updatedAt", label: "Updated At" },
  { field: "id", label: "Client ID" },
  { field: "email", label: "Email" },
  { field: "type", label: "Client Type" },
  { field: "status", label: "Status" },
];

export const sortOptions = [
  {
    field: "clientName",
    label: "Client Name",
    options: [
      { value: "asc", label: "A-Z" },
      { value: "desc", label: "Z-A" },
    ],
    selected: "",
  },
  {
    field: "createdAt",
    label: "Created At",
    options: [
      { value: "newest", label: "Newest to Oldest" },
      { value: "oldest", label: "Oldest to Newest" },
    ],
    selected: "",
  },
  {
    field: "updatedAt",
    label: "Updated At",
    options: [
      { value: "newest", label: "Newest to Oldest" },
      { value: "oldest", label: "Oldest to Newest" },
    ],
    selected: "",
  },
  {
    field: "clientId",
    label: "Client ID",
    options: [
      { value: "asc", label: "A-Z" },
      { value: "desc", label: "Z-A" },
    ],
    selected: "",
  },
];

export const tabList = ["all", "individual", "company"];
