export const latestRequests = {
  heading: ["Order Id", "Pickup Location", "Actions"],
};

export const userRequestsHistory = {
  heading: ["Id", "Source Address", "Destination Address", "Status"],
};

export const allOrder = {
  heading: ["Name", "Email", "Action"],
};

export const requestsHistory = {
  heading: [
    "Order Id",
    "Created Date",
    "Status",
    "Picked up by",
    "Contact Number",
  ],
  data: [
    [
      "11",
      "Oct 21, 2024",
      [
        {
          label: "cancelled",
          color: "danger",
          onClick: () => console.log("Edit John"),
        },
      ],
      "Not yet picked up",
      "Not yet picked up",
    ],
    [
      "12",
      "Oct 24, 2024",
      [
        {
          label: "pending",
          color: "warning",
          onClick: () => console.log("Edit John"),
        },
      ],
      "Not yet picked up",
      "Not yet picked up",
    ],
  ],
};

export const allManagers = {
  heading: ["Name", "Address", "Email", "Actions"],
  data: [
    [
      "rider",
      "Rawalpindi",
      "rider@gmail.com",
      [
        {
          label: "Edit",
          color: "edit",
          onClick: () => console.log("Edit John"),
        },
        {
          label: "Delete",
          color: "danger",
          onClick: () => console.log("Edit John"),
        },
      ],
    ],
    [
      "rider3",
      "harley street",
      "rider3@gmail.com",
      [
        {
          label: "Edit",
          color: "edit",
          onClick: () => console.log("Edit John"),
        },
        {
          label: "Delete",
          color: "danger",
          onClick: () => console.log("Edit John"),
        },
      ],
    ],
  ],
};

export const allUsers = {
  heading: ["Name", "Email", "Date Join", "Role", "Actions"],
  data: [
    [
      "user1",
      "user1@gmail.com",
      "Sept 12, 2024, 10:07 p.m.",
      "User",
      [
        {
          label: "Delete",
          color: "danger",
          onClick: () => console.log("Edit John"),
        },
      ],
    ],
    [
      "hammadtest",
      "hammadasmat61@gmail.com",
      "Oct 19, 2024, 04:12 a.m.",
      "User",
      [
        {
          label: "Delete",
          color: "danger",
          onClick: () => console.log("Edit John"),
        },
      ],
    ],
    [
      "hannaddev",
      "hammad.hussain@barq.dev",
      "Oct 20, 2024, 08:38 a.m.",
      "User",
      [
        {
          label: "Delete",
          color: "danger",
          onClick: () => console.log("Edit John"),
        },
      ],
    ],
  ],
};

export const menu = [
  {
    name: "Beverages",
    data: [
      {
        id: "1",
        name: "Soft Drinks",
        products: [
          {
            id: "1",
            name: "Coca Cola",
            image: "https://via.placeholder.com/80",
            price: 1.99,
          },
          {
            id: "2",
            name: "Pepsi",
            image: "https://via.placeholder.com/80",
            price: 1.89,
          },
        ],
      },
      {
        id: "2",
        name: "Juices",
        products: [
          {
            id: "3",
            name: "Orange Juice",
            image: "https://via.placeholder.com/80",
            price: 2.99,
          },
          {
            id: "4",
            name: "Apple Juice",
            image: "https://via.placeholder.com/80",
            price: 2.79,
          },
        ],
      },
    ],
  },
  {
    name: "Snacks",
    data: [
      {
        id: "3",
        name: "Chips",
        products: [
          {
            id: "5",
            name: "Lays",
            image: "https://via.placeholder.com/80",
            price: 1.49,
          },
          {
            id: "6",
            name: "Doritos",
            image: "https://via.placeholder.com/80",
            price: 1.69,
          },
        ],
      },
    ],
  },
  {
    name: "Snacks",
    data: [
      {
        id: "3",
        name: "Chips",
        products: [
          {
            id: "5",
            name: "Lays",
            image: "https://via.placeholder.com/80",
            price: 1.49,
          },
          {
            id: "6",
            name: "Doritos",
            image: "https://via.placeholder.com/80",
            price: 1.69,
          },
        ],
      },
    ],
  },
];
