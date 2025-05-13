import axios from 'axios';

const API = axios.create({
  baseURL: 'https://study.cyberbx.co.uk/api',
});

export const startParticipant = () => API.post('/participants/start');
export const submitConsent = (data) => API.post('/participants/consent', data);
export const submitDemographics = (data) => API.post('/participants/demographics', data);
export const assignGroup = (data) => API.post('/participants/assign-group', data);
export const completeIntervention = (data) => API.post('/participants/complete-intervention', data);
export const submitPostSurvey = (data) => API.post('/participants/post-survey', data);
export const withdrawParticipant = (data) => API.post('/participants/withdraw', data);
export const markInterventionComplete = (data) =>
  API.post('/participants/complete-intervention', data);
