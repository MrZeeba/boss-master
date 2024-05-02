import { StyleSheet } from 'react-native';
import { globalColours } from './globalColours';

export const globalStyles = StyleSheet.create({
  primaryColour: {
    backgroundColor: globalColours.primary,
  },

  pageContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },

  text: {
    fontSize: 15,
    lineHeight: 1.2,
  },

  container: {
    backgroundColor: 'white',
    padding: 5,
    elevation: 2,
    borderRadius: 4,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: globalColours.primary,
  },

  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    textShadowColor: 'rgba(0, 0, 0, .5)',
    textShadowOffset: { width: -0.5, height: -0.5 },
    textShadowRadius: 1,
    color: globalColours.secondary,
  },

  formArea: {
    margin: 10,
  },
});
