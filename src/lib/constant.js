export const availableFields = [
  { field: "clientId", label: "Client ID" },
  { field: "clientName", label: "Client Name" },
  { field: "type", label: "Client Type" },
  { field: "email", label: "Email" },
  { field: "status", label: "Status" },
  { field: "createdAt", label: "Created At" },
  { field: "updatedAt", label: "Updated At" },
  { field: "updatedBy", label: "Updated By" },
];

export const sortOptions = [
  {
    field: "clientId",
    label: "Client ID",
    options: [
      { value: "asc", label: "A-Z" },
      { value: "desc", label: "Z-A" },
    ],
    selected: "",
  },
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
];

export const tabList = ["all", "individual", "company"];
