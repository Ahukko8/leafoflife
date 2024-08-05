import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import db from "@/src/db/db";
import { formatCurrency, formatNumber } from "@/src/lib/formatters";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: data._sum.pricePaidInCents || 0 / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true}}),
    db.product.count({ where: {isAvailableForPurchase: false}})
  ])

  return {
    activeCount,
    inactiveCount
  }

}

async function getAppointmentData() {
  const [appointmentCount, pendingAppointmentCount] = await Promise.all([
    db.appointment.count(), // Count total appointments
    db.appointment.count({ where: {status: 'PENDING'} }), // Count pending appointments
  ]);

  return {
    appointmentCount,
    pendingAppointmentCount,
  };
}


export default async function AdminDashboard() {
  const [salesData, userData, productData, appointmentData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
    getAppointmentData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={formatNumber(userData.userCount)}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(
          productData.inactiveCount
        )} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
      <DashboardCard
        title="Appointments"
        subtitle={`${formatNumber(
          appointmentData.pendingAppointmentCount
        )} pending`}
        body={formatNumber(appointmentData.appointmentCount)}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
