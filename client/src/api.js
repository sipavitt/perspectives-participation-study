import axios from 'axios';

const API = axios.create({
  baseURL: 'https://study.cyberbx.co.uk/api',
});

// Generate new participant and return code
export const createParticipant = async () => {
  const response = await API.post('/participants/create');
  return response.data;
};

// Submit consent status
export const submitConsent = async (data) => {
  const response = await API.post('/participants/consent', data);
  return response.data;
};

// Submit demographics
export const submitDemographics = async (data) => {
  const response = await API.post('/participants/demographics', data);
  return response.data;
};

// Submit full post-survey (all responses)
export const submitPostSurvey = async (data) => {
  const response = await API.post('/participants/postsurvey', data);
  return response.data;
};

// Optional: Withdraw participant (if feature enabled)
export const withdrawParticipant = async (code) => {
  const response = await API.post('/participants/withdraw', { code });
  return response.data;
};

export const assignGroup = async (code) => {
  const response = await API.post('/participants/assign', { code });
  return response.data;
};
