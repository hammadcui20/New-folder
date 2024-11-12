import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import axios from "axios";
import { Table } from "../../components";
import { useTheme } from "../../../assets/colors/ThemeContext";

export default function Requests() {
  const { theme } = useTheme();
  const [latestRequestsData, setLatestRequestsData] = useState([]);
  const [userRequestsHistoryData, setUserRequestsHistoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Latest Requests
        const email = await AsyncStorage.getItem("user_email");
        console.log(email)
        const latestRequestsResponse = await axios.post('https://6520-116-71-184-99.ngrok-free.app/api/requests/',
          {
            email: email,
          }
        );
        console.log(latestRequestsResponse)
        const formattedLatestRequestsData = latestRequestsResponse.data.map(request => [
          request.id,
          new Date(request.created_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          [
            {
              label: request.status,
              color: getStatusColor(request.status),
              onClick: () => console.log(`Edit ${request.id}`),
            },
          ],
          request.picked_up_by || "Not yet picked up",
          request.contact_number || "Not yet picked up",
        ]);
        setLatestRequestsData(formattedLatestRequestsData);

        // Fetch User Requests History
        const userRequestsResponse = await axios.get('YOUR_API_ENDPOINT_FOR_USER_REQUESTS_HISTORY');
        const formattedUserRequestsData = userRequestsResponse.data.map(request => [
          request.id,
          request.source_address,
          request.destination_address,
          request.status,
        ]);
        setUserRequestsHistoryData(formattedUserRequestsData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "cancelled":
        return "danger";
      case "pending":
        return "warning";
      case "completed":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Table
        headings={["Order Id", "Created Date", "Status", "Picked up by", "Contact Number"]}
        bodyData={latestRequestsData}
        tableTitle={"Latest Requests"}
        actionColumnIndex={2} // Assuming status column has actions
      />
      <Table
        headings={["Id", "Source Address", "Destination Address", "Status"]}
        bodyData={userRequestsHistoryData}
        tableTitle={"Request History"}
        emailColumnIndex={1} // Assuming email column here if needed
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
