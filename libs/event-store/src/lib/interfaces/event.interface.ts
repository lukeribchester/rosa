export interface Event {
  id: string;
  timestamp: Date;
  type: string;
}

export interface AvailabilityUpdated extends Event {
  type: 'AVAILABILITY_UPDATED';
  payload: {
    availability: {
      from: Date;
      to: Date;
    };
  };
}

export interface AppointmentCreated extends Event {
  type: 'APPOINTMENT_CREATED';
  payload: {
    appointment: {
      from: Date;
      to: Date;
    };
  };
}
