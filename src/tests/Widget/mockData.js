export const mockDeliverable = {
  "name": "Rush with possible clients",
  "url": "localhost:8080/deliverables/rush-cold-call",
  "recording": {
    "startTime": null,
    "intervals": [{
      "start": "2016-12-13T13:37:01.465Z",
      "end": "2016-12-13T13:41:23.457Z"
    }]
  }
}

export const mockProject = {
  "name": "Rushed project",
  "url": "localhost:8080/projects/rushed-project",
  "unselectedDeliverables": [
    mockDeliverable, {
    "name": "Rush with online ads",
    "url": "localhost:8080/deliverables/rush-buy-ads",
    "recording": {
      "startTime": null,
      "intervals": [{
        "start": "2016-12-13T13:36:58.941Z",
        "end": "2016-12-13T13:37:01.460Z"
      }]
    }
  }, {
    "name": "Rush with logo",
    "url": "localhost:8080/deliverables/rush-create-logo",
    "recording": null
  }],
  "selectedDeliverable": mockDeliverable
};

export const mockUnselectedDeliverable = {
  "name": "Useless logo",
  "url": "localhost:8080/deliverables/useless-create-logo",
  "recording": null
};

export const mockUnselectedProject = {
  "name": "Useless project",
  "url": "localhost:8080/projects/rushed-project",
  "unselectedDeliverables": [
    mockUnselectedDeliverable, {
    "name": "Useless online ads",
    "url": "localhost:8080/deliverables/useless-buy-ads",
    "recording": null
  }, {
    "name": "Useless possible clients",
    "url": "localhost:8080/deliverables/useless-cold-call",
    "recording": null
  }],
  "selectedDeliverable": null
};

export const mockModel = {
  "minimised": false,
  "serverURL": "./data.json",
  "unselectedProjects": [
    mockUnselectedProject, {
    "name": "Big project",
    "url": "localhost:8080/projects/big-project",
    "unselectedDeliverables": [{
      "name": "Cold call possible clients",
      "url": "localhost:8080/deliverables/cold-call",
      "recording": {
        "startTime": "2016-12-13T13:37:52.078Z", /// Is recording
        "intervals": [{
          "start": "2016-12-13T13:36:52.078Z",
          "end": "2016-12-13T13:36:55.013Z"
        }]
      }
    }, {
      "name": "Buy online ads",
      "url": "localhost:8080/deliverables/buy-ads",
      "recording": {
        "startTime": "2016-12-13T13:39:52.078Z", // Is recording
        "intervals": [{
          "start": "2016-12-13T13:36:50.309Z",
          "end": "2016-12-13T13:36:52.075Z"
        }]
      }
    }],
    "selectedDeliverable": {
      "name": "Create logo",
      "url": "localhost:8080/deliverables/create-logo",
      "recording": {
        "startTime": null,
        "intervals": [{
          "start": "2016-12-13T13:36:55.018Z",
          "end": "2016-12-13T13:36:58.935Z"
        }]
      }
    }
  }],
  "selectedProject": mockProject,
}
