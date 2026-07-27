#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod mcp_bridge;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        // MCP-bridge-state (fase 1, Tauri-only): één actieve bridge of geen.
        .manage(mcp_bridge::BridgeState::default())
        // Alles wat hier staat is aanroepbaar via `window.__TAURI_INTERNALS__.invoke(...)`
        // en dus ook vanuit extensiecode in dezelfde realm. De vroegere
        // `read_file`/`write_file` waren daarmee een ongevalideerd lees-/schrijf-primitief
        // op het hele bestandssysteem, buiten de `plugin-fs`-scope om, zonder één gebruiker
        // in de frontend — daarom weg (bevinding K6a). Houd dit oppervlak klein.
        // `install_kind` is wél in gebruik: platform-introspectie voor de in-app updater
        // (env-read, geen domeinlogica). De twee mcp_bridge-commands sturen de MCP-bridge.
        .invoke_handler(tauri::generate_handler![
            commands::install_kind,
            mcp_bridge::mcp_bridge_start,
            mcp_bridge::mcp_bridge_stop,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Open Planner Studio");
}
