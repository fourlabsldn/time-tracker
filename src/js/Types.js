// Main application model

export type Client = {
    name: String,
}

export type Project = {
  name: String,
  billable: Boolean,
  client: Array<Client>,
}

export type Task = {
  project: Project,
  title: String,
  startTime: Date,
}

export type ActiveTask = Task & {
  endDate: void,
}

export type CompletedTask = Task & {
  endDate: Date,
}
