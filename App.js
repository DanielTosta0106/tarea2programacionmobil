import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [contador, setContador] = useState(0);
  const [mensajeContador, setMensajeContador] = useState(
    'Esperando un cambio en el contador...'
  );

  // Este ref no representa una vista, sino una pista de depuracion:
  // cuenta cuantas veces React ha renderizado el componente para comparar
  // el comportamiento de cada efecto con los ciclos de vida reales de la UI.
  const renderCount = useRef(0);
  renderCount.current += 1;

  /*
   * useEffect sin arreglo de dependencias:
   * React lo ejecuta despues de cada render, porque al no indicar una
   * lista de dependencias, el efecto se vuelve a disparar con cualquier
   * cambio del componente. Esto es util para tareas que deben vigilar todo
   * el estado del componente, como registrar eventos o sincronizar con un
   * servicio externo, pero no es recomendable para actualizar estado local
   * dentro del mismo efecto porque puede crear un bucle infinito de render.
   */
  useEffect(() => {
    console.log(`useEffect sin dependencias: render #${renderCount.current}`);
  });

  /*
   * useEffect con arreglo de dependencias [contador]:
   * Aqui definimos una dependencia concreta: el efecto solo se ejecuta despues
   * del montaje inicial y cuando contador cambia. Este patron es ideal cuando
   * queremos reaccionar a un valor especifico, como consultar datos, guardar el
   * estado en almacenamiento o actualizar texto derivado de una variable.
   * Si el arreglo estuviera vacio, [] , el efecto correria solo una vez al
   * montar el componente y no volveria a dispararse por cambios de contador.
   */
  useEffect(() => {
    const mensaje = `El contador cambio a ${contador}`;
    console.log(`useEffect con dependencias: ${mensaje}`);
    setMensajeContador(mensaje);
  }, [contador]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.eyebrow}>PROGRAMACION MOVIL</Text>
        <Text style={styles.title}>useEffect en accion</Text>
        <Text style={styles.subtitle}>
          Una pantalla para observar cuando se ejecuta cada efecto.
        </Text>
      </View>

      <View style={styles.counterPanel}>
        <Text style={styles.panelLabel}>ESTADO INTERACTIVO</Text>
        <Text style={styles.counter}>{contador}</Text>
        <Text style={styles.counterCaption}>valor actual del contador</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Incrementar contador"
          onPress={() => setContador((valorActual) => valorActual + 1)}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>+ Incrementar contador</Text>
        </Pressable>
      </View>

      <View style={styles.logPanel}>
        <Text style={styles.panelLabel}>REGISTRO VISIBLE</Text>
        <View style={styles.logRow}>
          <View style={[styles.dot, styles.blueDot]} />
          <View style={styles.logContent}>
            <Text style={styles.logTitle}>Sin dependencias</Text>
            <Text style={styles.logText}>
              Se ejecuto despues de cada render. Render actual: #{renderCount.current}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.logRow}>
          <View style={[styles.dot, styles.orangeDot]} />
          <View style={styles.logContent}>
            <Text style={styles.logTitle}>Con [contador]</Text>
            <Text style={styles.logText}>{mensajeContador}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.footer}>Revisa tambien la consola de Expo para ver los logs.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102a43',
    paddingHorizontal: 24,
    paddingTop: 72,
  },
  header: {
    marginBottom: 28,
  },
  eyebrow: {
    color: '#f6ad55',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  title: {
    color: '#f7fafc',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0,
  },
  subtitle: {
    color: '#bcccdc',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  counterPanel: {
    backgroundColor: '#f7fafc',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
  },
  panelLabel: {
    color: '#627d98',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  counter: {
    color: '#102a43',
    fontSize: 64,
    fontWeight: '800',
    lineHeight: 76,
    marginTop: 4,
  },
  counterCaption: {
    color: '#829ab1',
    fontSize: 13,
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#d64545',
    borderRadius: 6,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  buttonPressed: {
    backgroundColor: '#ba3a3a',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  logPanel: {
    backgroundColor: '#243b53',
    borderRadius: 8,
    marginTop: 16,
    padding: 20,
  },
  logRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  dot: {
    borderRadius: 6,
    height: 12,
    marginRight: 12,
    marginTop: 4,
    width: 12,
  },
  blueDot: {
    backgroundColor: '#63b3ed',
  },
  orangeDot: {
    backgroundColor: '#f6ad55',
  },
  logContent: {
    flex: 1,
  },
  logTitle: {
    color: '#f7fafc',
    fontSize: 15,
    fontWeight: '700',
  },
  logText: {
    color: '#bcccdc',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  divider: {
    backgroundColor: '#486581',
    height: 1,
    marginTop: 16,
  },
  footer: {
    color: '#829ab1',
    fontSize: 12,
    marginTop: 18,
    textAlign: 'center',
  },
});
