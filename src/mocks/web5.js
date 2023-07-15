const mockWeb5 = {
  connect: jest.fn(() => Promise.resolve({ web5: 'mockWeb5', did: 'mockDid' })),
  dwn: {
    records: {
      query: jest.fn(),
      create: jest.fn(),
    },
  },
};

export default mockWeb5;

