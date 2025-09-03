<section class="panel">
  <h2>Test API через прокси</h2>

  <label for="userId">User ID</label>
  <input id="userId" class="search-input" placeholder="например, 951368462" />

  <details style="margin-top:10px">
    <summary>Вставить initData (если не в Telegram)</summary>
    <p class="muted">
      Если Mini App открыт <b>в Telegram</b>, initData возьмём автоматически из SDK.
      Если тестируешь в браузере, вставь сюда строку, как в твоём curl:
      <code>query_id=...&user=...&auth_date=...&signature=...&hash=...</code>
    </p>
    <textarea id="authPayload" style="width:100%;height:110px" placeholder="query_id=...&user=...&auth_date=...&signature=...&hash=..."></textarea>
  </details>

  <button id="btnRun" class="tab-btn" style="margin-top:10px">Запросить → показать сырой ответ</button>

  <pre id="out" style="white-space:pre-wrap; overflow:auto; margin-top:12px; background:rgba(0,0,0,.25); padding:10px; border-radius:12px;"></pre>
</section>
