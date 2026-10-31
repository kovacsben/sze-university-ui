import React from "react";
import LiveErrorView from "./LiveErrorView";
import { lineFromStack } from "./sourceLocation";

/**
 * Példánkénti error boundary: egy hibás (akár kézzel elrontott) példa csak a
 * saját kártyáját cseréli hibaüzenetre, a bemutató oldal többi része él.
 *
 * A `resetKey` változásakor (új kód) a boundary újrapróbálja a renderelést.
 * Az `onError` az iframe-előnézetnek jelzi a hibát (a szülő aria-live régiójához).
 */
export default class ExampleErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    // Saját objektumot építünk: a dobott érték nem feltétlenül Error (lehet string is).
    return {
      error: { kind: "runtime", message: error?.message ?? String(error), ...lineFromStack(error) },
    };
  }

  componentDidCatch(error) {
    this.props.onError?.(error);
  }

  componentDidUpdate(prevProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) return <LiveErrorView error={this.state.error} code={this.props.code} />;
    return this.props.children;
  }
}
