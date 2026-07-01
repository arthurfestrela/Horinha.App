import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/user.routes";

import establishmentRoutes from "./routes/establishment.routes";
import serviceRoutes from "./routes/service.routes";
import professionalRoutes from "./routes/professional.routes";
import appointmentRoutes from "./routes/appointment.routes";
import publicRoutes from "./routes/public.routes";
import professionalScheduleRoutes from "./routes/professional-schedule.routes";
import scheduleBlockRoutes from "./routes/schedule-block.routes";
import availabilityRoutes from "./routes/availability.routes";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(clerkMiddleware());

app.use("/users", userRoutes);
app.use("/establishment", establishmentRoutes);
app.use("/services", serviceRoutes);
app.use("/professionals", professionalRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/public", publicRoutes);
app.use("/", professionalScheduleRoutes);
app.use("/", scheduleBlockRoutes);
app.use("/", availabilityRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});