// 工具箱共用运行时：工具注册表、标题栏切换按钮、主题/按钮尺寸/语言、提示与复制
// 新增工具：在 TOOLS 末尾追加一项（页面放在同目录），所有页面的标题栏与首页介绍会自动出现
(function () {
  'use strict';

  const TOOLS = [
    {
      id: 'home',
      href: 'index.html',
      icon: [
        'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8',
        'M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
      ],
      name: { 'zh-CN': '首页', 'zh-TW': '首頁', en: 'Home', ja: 'ホーム', ko: '홈', es: 'Inicio', fr: 'Accueil', de: 'Start' }
    },
    {
      id: 'json',
      href: 'json-tool.html',
      icon: [
        'M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1',
        'M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1'
      ],
      name: {
        'zh-CN': 'JSON 工具', 'zh-TW': 'JSON 工具', en: 'JSON Tools', ja: 'JSON ツール',
        ko: 'JSON 도구', es: 'Herramientas JSON', fr: 'Outils JSON', de: 'JSON-Werkzeuge'
      },
      desc: {
        'zh-CN': '格式化、压缩、转义 JSON，支持 JSONPath 查询与多种格式转换。',
        'zh-TW': '格式化、壓縮、跳脫 JSON，支援 JSONPath 查詢與多種格式轉換。',
        en: 'Format, minify and escape JSON, with JSONPath queries and conversion to other formats.',
        ja: 'JSON の整形・圧縮・エスケープに加え、JSONPath 検索や他形式への変換に対応。',
        ko: 'JSON 정렬·압축·이스케이프와 JSONPath 조회, 다양한 형식 변환을 지원합니다.',
        es: 'Formatea, minifica y escapa JSON, con consultas JSONPath y conversión a otros formatos.',
        fr: 'Formatez, minifiez et échappez du JSON, avec requêtes JSONPath et conversion vers d’autres formats.',
        de: 'JSON formatieren, minimieren und escapen – mit JSONPath-Abfragen und Umwandlung in andere Formate.'
      },
      features: {
        'zh-CN': ['格式化 / 压缩', '转义 / 去转义', 'JSONPath 查询', '转 XML / YAML / 代码', 'CSV 导入导出', '折叠编辑'],
        'zh-TW': ['格式化 / 壓縮', '跳脫 / 取消跳脫', 'JSONPath 查詢', '轉 XML / YAML / 程式碼', 'CSV 匯入匯出', '摺疊編輯'],
        en: ['Format / Minify', 'Escape / Unescape', 'JSONPath query', 'To XML / YAML / code', 'CSV import & export', 'Foldable editor'],
        ja: ['整形 / 圧縮', 'エスケープ / 解除', 'JSONPath 検索', 'XML / YAML / コードへ変換', 'CSV の読み込み・保存', '折りたたみ編集'],
        ko: ['정렬 / 압축', '이스케이프 / 역이스케이프', 'JSONPath 조회', 'XML / YAML / 코드 변환', 'CSV 가져오기·내보내기', '접기 편집'],
        es: ['Formatear / Minificar', 'Escapar / Desescapar', 'Consulta JSONPath', 'A XML / YAML / código', 'Importar y exportar CSV', 'Editor plegable'],
        fr: ['Formater / Minifier', 'Échapper / Déséchapper', 'Requête JSONPath', 'Vers XML / YAML / code', 'Import et export CSV', 'Éditeur repliable'],
        de: ['Formatieren / Minimieren', 'Escapen / Unescapen', 'JSONPath-Abfrage', 'Nach XML / YAML / Code', 'CSV-Import und -Export', 'Faltbarer Editor']
      }
    },
    {
      id: 'timestamp',
      href: 'timestamp.html',
      icon: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6v6l4 2'],
      name: {
        'zh-CN': '时间戳', 'zh-TW': '時間戳', en: 'Timestamp', ja: 'タイムスタンプ',
        ko: '타임스탬프', es: 'Marca de tiempo', fr: 'Horodatage', de: 'Zeitstempel'
      },
      desc: {
        'zh-CN': '时间戳与日期时间互转，支持秒/毫秒自动识别和多时区显示。',
        'zh-TW': '時間戳與日期時間互轉，支援秒/毫秒自動辨識與多時區顯示。',
        en: 'Convert between Unix timestamps and dates, with seconds/milliseconds detection and time zones.',
        ja: 'Unix タイムスタンプと日時を相互変換。秒/ミリ秒の自動判別とタイムゾーンに対応。',
        ko: '유닉스 타임스탬프와 날짜를 상호 변환하며 초/밀리초 자동 인식과 시간대를 지원합니다.',
        es: 'Convierte entre marcas de tiempo Unix y fechas, con detección de segundos/milisegundos y zonas horarias.',
        fr: 'Convertissez horodatages Unix et dates, avec détection secondes/millisecondes et fuseaux horaires.',
        de: 'Unix-Zeitstempel und Datum ineinander umrechnen – mit Sekunden/Millisekunden-Erkennung und Zeitzonen.'
      },
      features: {
        'zh-CN': ['当前时间戳', '秒 / 毫秒自动识别', '日期转时间戳', '时区切换', '相对时间'],
        'zh-TW': ['目前時間戳', '秒 / 毫秒自動辨識', '日期轉時間戳', '時區切換', '相對時間'],
        en: ['Current timestamp', 'Auto s / ms', 'Date to timestamp', 'Time zones', 'Relative time'],
        ja: ['現在のタイムスタンプ', '秒 / ミリ秒を自動判別', '日時からタイムスタンプ', 'タイムゾーン', '相対時間'],
        ko: ['현재 타임스탬프', '초 / 밀리초 자동 인식', '날짜 → 타임스탬프', '시간대 전환', '상대 시간'],
        es: ['Marca actual', 'Detección s / ms', 'Fecha a marca de tiempo', 'Zonas horarias', 'Tiempo relativo'],
        fr: ['Horodatage actuel', 'Détection s / ms', 'Date vers horodatage', 'Fuseaux horaires', 'Temps relatif'],
        de: ['Aktueller Zeitstempel', 's / ms automatisch', 'Datum zu Zeitstempel', 'Zeitzonen', 'Relative Zeit']
      }
    },
    {
      id: 'base64',
      href: 'base64.html',
      icon: [
        'M6 20h4', 'M14 10h4', 'M6 14h2v6', 'M14 4h2v6',
        'M16 14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z',
        'M8 4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'
      ],
      name: { 'zh-CN': 'Base64', 'zh-TW': 'Base64', en: 'Base64', ja: 'Base64', ko: 'Base64', es: 'Base64', fr: 'Base64', de: 'Base64' },
      desc: {
        'zh-CN': 'Base64 编码与解码，支持中文、URL 安全格式与文件转换。',
        'zh-TW': 'Base64 編碼與解碼，支援中文、URL 安全格式與檔案轉換。',
        en: 'Encode and decode Base64, with Unicode text, URL-safe format and files.',
        ja: 'Base64 のエンコードとデコード。日本語テキスト、URL セーフ形式、ファイルに対応。',
        ko: 'Base64 인코딩과 디코딩. 한글 텍스트, URL 안전 형식, 파일 변환을 지원합니다.',
        es: 'Codifica y decodifica Base64, con texto Unicode, formato seguro para URL y archivos.',
        fr: 'Encodez et décodez en Base64, avec texte Unicode, format compatible URL et fichiers.',
        de: 'Base64 kodieren und dekodieren – mit Unicode-Text, URL-sicherem Format und Dateien.'
      },
      features: {
        'zh-CN': ['编码 / 解码', 'UTF-8 中文', 'URL 安全', '文件转 Base64', '解码为文件'],
        'zh-TW': ['編碼 / 解碼', 'UTF-8 中文', 'URL 安全', '檔案轉 Base64', '解碼為檔案'],
        en: ['Encode / Decode', 'UTF-8 text', 'URL-safe', 'File to Base64', 'Decode to file'],
        ja: ['エンコード / デコード', 'UTF-8 テキスト', 'URL セーフ', 'ファイルを Base64 に', 'ファイルとして保存'],
        ko: ['인코딩 / 디코딩', 'UTF-8 텍스트', 'URL 안전', '파일 → Base64', '파일로 디코딩'],
        es: ['Codificar / Decodificar', 'Texto UTF-8', 'Seguro para URL', 'Archivo a Base64', 'Decodificar a archivo'],
        fr: ['Encoder / Décoder', 'Texte UTF-8', 'Compatible URL', 'Fichier vers Base64', 'Décoder en fichier'],
        de: ['Kodieren / Dekodieren', 'UTF-8-Text', 'URL-sicher', 'Datei zu Base64', 'Als Datei dekodieren']
      }
    },
    {
      id: 'diff',
      href: 'diff.html',
      icon: [
        'M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', 'M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
        'M13 6h3a2 2 0 0 1 2 2v7', 'M11 18H8a2 2 0 0 1-2-2V9'
      ],
      name: {
        'zh-CN': '文本对比', 'zh-TW': '文字比對', en: 'Text Diff', ja: 'テキスト比較',
        ko: '텍스트 비교', es: 'Comparar texto', fr: 'Comparer des textes', de: 'Textvergleich'
      },
      desc: {
        'zh-CN': '逐行对比两段文本，高亮新增、删除和行内改动。',
        'zh-TW': '逐行比對兩段文字，標示新增、刪除與行內變更。',
        en: 'Compare two texts line by line, highlighting additions, deletions and in-line changes.',
        ja: '2 つのテキストを行ごとに比較し、追加・削除・行内の変更を強調表示。',
        ko: '두 텍스트를 줄 단위로 비교해 추가, 삭제, 줄 안의 변경을 강조합니다.',
        es: 'Compara dos textos línea a línea y resalta añadidos, eliminaciones y cambios dentro de la línea.',
        fr: 'Comparez deux textes ligne par ligne, avec ajouts, suppressions et modifications en ligne surlignés.',
        de: 'Zwei Texte zeilenweise vergleichen – Ergänzungen, Löschungen und Änderungen in der Zeile hervorgehoben.'
      },
      features: {
        'zh-CN': ['并排 / 合并视图', '行内差异', '忽略空白', '忽略大小写', '差异统计'],
        'zh-TW': ['並排 / 合併檢視', '行內差異', '忽略空白', '忽略大小寫', '差異統計'],
        en: ['Side-by-side / Unified', 'In-line changes', 'Ignore whitespace', 'Ignore case', 'Change stats'],
        ja: ['左右 / 統合表示', '行内の差分', '空白を無視', '大文字小文字を無視', '差分の統計'],
        ko: ['나란히 / 통합 보기', '줄 안 변경', '공백 무시', '대소문자 무시', '변경 통계'],
        es: ['En paralelo / Unificada', 'Cambios en línea', 'Ignorar espacios', 'Ignorar mayúsculas', 'Estadísticas'],
        fr: ['Côte à côte / Unifiée', 'Modifications en ligne', 'Ignorer les espaces', 'Ignorer la casse', 'Statistiques'],
        de: ['Nebeneinander / Einheitlich', 'Änderungen in der Zeile', 'Leerraum ignorieren', 'Groß-/Kleinschreibung ignorieren', 'Statistik']
      }
    },
    {
      id: 'url',
      href: 'url.html',
      icon: [
        'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
        'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'
      ],
      name: {
        'zh-CN': 'URL 编码', 'zh-TW': 'URL 編碼', en: 'URL Encode', ja: 'URL エンコード',
        ko: 'URL 인코딩', es: 'Codificar URL', fr: 'Encodage URL', de: 'URL-Kodierung'
      },
      desc: {
        'zh-CN': 'URL 编码与解码，并可拆解链接的协议、主机、路径和查询参数。',
        'zh-TW': 'URL 編碼與解碼，並可拆解連結的協定、主機、路徑與查詢參數。',
        en: 'Encode and decode URLs, and break a link into protocol, host, path and query parameters.',
        ja: 'URL のエンコードとデコード。リンクをプロトコル・ホスト・パス・クエリに分解。',
        ko: 'URL 인코딩과 디코딩, 링크를 프로토콜·호스트·경로·쿼리 매개변수로 분해합니다.',
        es: 'Codifica y decodifica URL y desglosa un enlace en protocolo, host, ruta y parámetros.',
        fr: 'Encodez et décodez des URL, et décomposez un lien en protocole, hôte, chemin et paramètres.',
        de: 'URLs kodieren und dekodieren und Links in Protokoll, Host, Pfad und Parameter zerlegen.'
      },
      features: {
        'zh-CN': ['编码 / 解码', '组件 / 完整 URL', '空格转 +', 'URL 解析', '查询参数表'],
        'zh-TW': ['編碼 / 解碼', '元件 / 完整 URL', '空格轉 +', 'URL 解析', '查詢參數表'],
        en: ['Encode / Decode', 'Component / Full URL', 'Space as +', 'URL parsing', 'Query table'],
        ja: ['エンコード / デコード', 'コンポーネント / URL 全体', '空白を + に', 'URL 解析', 'クエリ一覧'],
        ko: ['인코딩 / 디코딩', '구성 요소 / 전체 URL', '공백 → +', 'URL 분석', '쿼리 표'],
        es: ['Codificar / Decodificar', 'Componente / URL completa', 'Espacio como +', 'Análisis de URL', 'Tabla de parámetros'],
        fr: ['Encoder / Décoder', 'Composant / URL complète', 'Espace en +', 'Analyse d’URL', 'Tableau des paramètres'],
        de: ['Kodieren / Dekodieren', 'Komponente / Ganze URL', 'Leerzeichen als +', 'URL-Analyse', 'Parametertabelle']
      }
    },
    {
      id: 'jwt',
      href: 'jwt.html',
      icon: [
        'M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z',
        'M16.5 7.5h.01'
      ],
      name: {
        'zh-CN': 'JWT 解析', 'zh-TW': 'JWT 解析', en: 'JWT Decoder', ja: 'JWT 解析',
        ko: 'JWT 디코더', es: 'Decodificar JWT', fr: 'Décodeur JWT', de: 'JWT-Decoder'
      },
      desc: {
        'zh-CN': '解析 JWT 的头部与载荷，显示过期时间，并可验证签名。',
        'zh-TW': '解析 JWT 的標頭與酬載，顯示到期時間，並可驗證簽章。',
        en: 'Decode JWT header and payload, show expiry and verify signatures.',
        ja: 'JWT のヘッダーとペイロードを解析し、有効期限を表示、署名も検証できます。',
        ko: 'JWT 헤더와 페이로드를 해석하고 만료 시간을 표시하며 서명을 검증합니다.',
        es: 'Decodifica la cabecera y el payload de un JWT, muestra su caducidad y verifica la firma.',
        fr: 'Décodez l’en-tête et la charge utile d’un JWT, affichez l’expiration et vérifiez la signature.',
        de: 'JWT-Header und -Payload dekodieren, Ablauf anzeigen und Signaturen prüfen.'
      },
      features: {
        'zh-CN': ['头部 / 载荷', '过期状态', '时间字段转换', 'HS / RS / ES 验签'],
        'zh-TW': ['標頭 / 酬載', '到期狀態', '時間欄位轉換', 'HS / RS / ES 驗簽'],
        en: ['Header / Payload', 'Expiry status', 'Readable time claims', 'HS / RS / ES verify'],
        ja: ['ヘッダー / ペイロード', '有効期限の状態', '時刻クレームを変換', 'HS / RS / ES 署名検証'],
        ko: ['헤더 / 페이로드', '만료 상태', '시간 클레임 변환', 'HS / RS / ES 서명 검증'],
        es: ['Cabecera / Payload', 'Estado de caducidad', 'Fechas legibles', 'Verificar HS / RS / ES'],
        fr: ['En-tête / Charge utile', 'État d’expiration', 'Dates lisibles', 'Vérification HS / RS / ES'],
        de: ['Header / Payload', 'Ablaufstatus', 'Lesbare Zeitangaben', 'HS / RS / ES prüfen']
      }
    },
    {
      id: 'cron',
      href: 'cron.html',
      icon: [
        'M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5', 'M16 2v4', 'M8 2v4', 'M3 10h5',
        'M17.5 17.5 16 16.3V14', 'M16 10a6 6 0 1 0 0 12 6 6 0 0 0 0-12z'
      ],
      name: {
        'zh-CN': 'Cron 解析', 'zh-TW': 'Cron 解析', en: 'Cron Parser', ja: 'Cron 解析',
        ko: 'Cron 해석', es: 'Analizar Cron', fr: 'Analyse Cron', de: 'Cron-Parser'
      },
      desc: {
        'zh-CN': '解析 Cron 表达式，列出各字段含义与接下来的执行时间。',
        'zh-TW': '解析 Cron 運算式，列出各欄位含義與接下來的執行時間。',
        en: 'Parse cron expressions, explain each field and list upcoming run times.',
        ja: 'Cron 式を解析し、各フィールドの意味と今後の実行時刻を一覧表示。',
        ko: 'Cron 표현식을 해석해 각 필드의 의미와 다음 실행 시각을 보여 줍니다.',
        es: 'Analiza expresiones cron, explica cada campo y lista las próximas ejecuciones.',
        fr: 'Analysez une expression cron, détaillez chaque champ et listez les prochaines exécutions.',
        de: 'Cron-Ausdrücke analysieren, jedes Feld erklären und die nächsten Ausführungen auflisten.'
      },
      features: {
        'zh-CN': ['5 / 6 位表达式', '字段说明', '未来执行时间', 'L / W / # 语法', '本地 / UTC'],
        'zh-TW': ['5 / 6 欄位運算式', '欄位說明', '未來執行時間', 'L / W / # 語法', '本機 / UTC'],
        en: ['5 / 6 fields', 'Field breakdown', 'Next run times', 'L / W / # syntax', 'Local / UTC'],
        ja: ['5 / 6 フィールド', 'フィールドの説明', '今後の実行時刻', 'L / W / # 構文', 'ローカル / UTC'],
        ko: ['5 / 6 필드', '필드 설명', '다음 실행 시각', 'L / W / # 문법', '로컬 / UTC'],
        es: ['5 / 6 campos', 'Detalle de campos', 'Próximas ejecuciones', 'Sintaxis L / W / #', 'Local / UTC'],
        fr: ['5 / 6 champs', 'Détail des champs', 'Prochaines exécutions', 'Syntaxe L / W / #', 'Local / UTC'],
        de: ['5 / 6 Felder', 'Feldaufschlüsselung', 'Nächste Ausführungen', 'L / W / # Syntax', 'Lokal / UTC']
      }
    }
  ];

  const THEMES = [
    ['tokyo-night', 'Tokyo Night'], ['dracula', 'Dracula'], ['monokai', 'Monokai'], ['nord', 'Nord'],
    ['solarized-dark', 'Solarized Dark'], ['github-light', 'GitHub Light'], ['solarized-light', 'Solarized Light']
  ];
  const LANGS = [
    ['zh-CN', '简体中文'], ['zh-TW', '繁體中文'], ['en', 'English'], ['ja', '日本語'],
    ['ko', '한국어'], ['es', 'Español'], ['fr', 'Français'], ['de', 'Deutsch']
  ];
  const SIZES = { sm: [24, 12], md: [28, 13], lg: [33, 14], xl: [39, 15.5] };
  // 键名沿用 JSON 工具，所有页面共享同一份偏好
  const KEYS = { theme: 'json-tool-theme', size: 'json-tool-btnsize', lang: 'json-tool-lang' };

  const COMMON = {
    'zh-CN': {
      brand: '开发者工具箱', nav: '工具切换', 'tip.settings': '设置', 'tip.theme': '配色主题（自动记住选择）', 'aria.theme': '配色主题',
      'set.size': '工具栏按钮大小', 'set.lang': '界面语言', 'set.remember': '· 选择会自动记住',
      'size.sm': '较小', 'size.md': '适中', 'size.lg': '大', 'size.xl': '很大', 'size.tip': '{0}px 高 · {1}px 字号', 'size.def': '（默认）',
      'toast.copied': '已复制 {0}', 'toast.copyFail': '复制失败，请手动选择', 'toast.noCopy': '没有可复制的内容',
      'toast.noDl': '没有可下载的内容', 'toast.dl': '已开始下载', 'toast.empty': '内容为空', 'toast.cleared': '已清空',
      'toast.loaded': '已载入 {0}', 'toast.readFail': '读取文件失败', 'toast.tooBig': '文件超过 30MB，已拒绝',
      'toast.theme': '主题：{0}', 'toast.size': '按钮大小：{0}', 'toast.lang': '语言：{0}',
      'btn.copy': '复制', 'btn.clear': '清空', 'btn.download': '下载', 'btn.open': '打开', 'btn.sample': '示例'
    },
    'zh-TW': {
      brand: '開發者工具箱', nav: '工具切換', 'tip.settings': '設定', 'tip.theme': '配色主題（自動記住選擇）', 'aria.theme': '配色主題',
      'set.size': '工具列按鈕大小', 'set.lang': '介面語言', 'set.remember': '· 選擇會自動記住',
      'size.sm': '較小', 'size.md': '適中', 'size.lg': '大', 'size.xl': '很大', 'size.tip': '{0}px 高 · {1}px 字型大小', 'size.def': '（預設）',
      'toast.copied': '已複製 {0}', 'toast.copyFail': '複製失敗，請手動選取', 'toast.noCopy': '沒有可複製的內容',
      'toast.noDl': '沒有可下載的內容', 'toast.dl': '已開始下載', 'toast.empty': '內容為空', 'toast.cleared': '已清空',
      'toast.loaded': '已載入 {0}', 'toast.readFail': '讀取檔案失敗', 'toast.tooBig': '檔案超過 30MB，已拒絕',
      'toast.theme': '主題：{0}', 'toast.size': '按鈕大小：{0}', 'toast.lang': '語言：{0}',
      'btn.copy': '複製', 'btn.clear': '清空', 'btn.download': '下載', 'btn.open': '開啟', 'btn.sample': '範例'
    },
    en: {
      brand: 'Dev Toolbox', nav: 'Switch tool', 'tip.settings': 'Settings', 'tip.theme': 'Color theme (remembered)', 'aria.theme': 'Color theme',
      'set.size': 'Toolbar button size', 'set.lang': 'Language', 'set.remember': '· remembered automatically',
      'size.sm': 'Small', 'size.md': 'Medium', 'size.lg': 'Large', 'size.xl': 'Huge', 'size.tip': '{0}px tall · {1}px font', 'size.def': ' (default)',
      'toast.copied': 'Copied {0}', 'toast.copyFail': 'Copy failed, please select manually', 'toast.noCopy': 'Nothing to copy',
      'toast.noDl': 'Nothing to download', 'toast.dl': 'Download started', 'toast.empty': 'Nothing to process', 'toast.cleared': 'Cleared',
      'toast.loaded': 'Loaded {0}', 'toast.readFail': 'Failed to read file', 'toast.tooBig': 'File exceeds 30MB, rejected',
      'toast.theme': 'Theme: {0}', 'toast.size': 'Button size: {0}', 'toast.lang': 'Language: {0}',
      'btn.copy': 'Copy', 'btn.clear': 'Clear', 'btn.download': 'Download', 'btn.open': 'Open', 'btn.sample': 'Sample'
    },
    ja: {
      brand: '開発者ツール', nav: 'ツール切り替え', 'tip.settings': '設定', 'tip.theme': '配色テーマ（自動で記憶）', 'aria.theme': '配色テーマ',
      'set.size': 'ツールバーのボタンサイズ', 'set.lang': '表示言語', 'set.remember': '· 選択は自動で記憶されます',
      'size.sm': '小さめ', 'size.md': '標準', 'size.lg': '大きめ', 'size.xl': '最大', 'size.tip': '高さ {0}px · 文字 {1}px', 'size.def': '（既定）',
      'toast.copied': '{0} をコピーしました', 'toast.copyFail': 'コピーに失敗しました。手動で選択してください', 'toast.noCopy': 'コピーする内容がありません',
      'toast.noDl': '保存する内容がありません', 'toast.dl': '保存を開始しました', 'toast.empty': '入力が空です', 'toast.cleared': 'クリアしました',
      'toast.loaded': '{0} を読み込みました', 'toast.readFail': 'ファイルの読み込みに失敗', 'toast.tooBig': 'ファイルが 30MB を超えるため拒否しました',
      'toast.theme': 'テーマ：{0}', 'toast.size': 'ボタンサイズ：{0}', 'toast.lang': '言語：{0}',
      'btn.copy': 'コピー', 'btn.clear': 'クリア', 'btn.download': '保存', 'btn.open': '開く', 'btn.sample': 'サンプル'
    },
    ko: {
      brand: '개발자 도구 상자', nav: '도구 전환', 'tip.settings': '설정', 'tip.theme': '색 테마 (자동 저장)', 'aria.theme': '색 테마',
      'set.size': '툴바 버튼 크기', 'set.lang': '인터페이스 언어', 'set.remember': '· 선택은 자동 저장됩니다',
      'size.sm': '작게', 'size.md': '보통', 'size.lg': '크게', 'size.xl': '아주 크게', 'size.tip': '높이 {0}px · 글자 {1}px', 'size.def': ' (기본)',
      'toast.copied': '{0} 복사됨', 'toast.copyFail': '복사 실패, 직접 선택하세요', 'toast.noCopy': '복사할 내용이 없습니다',
      'toast.noDl': '저장할 내용이 없습니다', 'toast.dl': '저장을 시작했습니다', 'toast.empty': '내용이 비어 있습니다', 'toast.cleared': '지웠습니다',
      'toast.loaded': '{0} 불러옴', 'toast.readFail': '파일을 읽지 못했습니다', 'toast.tooBig': '파일이 30MB 를 초과하여 거부했습니다',
      'toast.theme': '테마: {0}', 'toast.size': '버튼 크기: {0}', 'toast.lang': '언어: {0}',
      'btn.copy': '복사', 'btn.clear': '지우기', 'btn.download': '저장', 'btn.open': '열기', 'btn.sample': '예시'
    },
    es: {
      brand: 'Herramientas para desarrolladores', nav: 'Cambiar de herramienta', 'tip.settings': 'Ajustes', 'tip.theme': 'Tema de color (se recuerda)', 'aria.theme': 'Tema de color',
      'set.size': 'Tamaño de los botones', 'set.lang': 'Idioma', 'set.remember': '· se recuerda automáticamente',
      'size.sm': 'Pequeño', 'size.md': 'Mediano', 'size.lg': 'Grande', 'size.xl': 'Enorme', 'size.tip': '{0}px de alto · fuente de {1}px', 'size.def': ' (predeterminado)',
      'toast.copied': 'Copiado {0}', 'toast.copyFail': 'Falló la copia, selecciona manualmente', 'toast.noCopy': 'Nada que copiar',
      'toast.noDl': 'Nada que descargar', 'toast.dl': 'Descarga iniciada', 'toast.empty': 'Sin contenido', 'toast.cleared': 'Vaciado',
      'toast.loaded': 'Cargado {0}', 'toast.readFail': 'No se pudo leer el archivo', 'toast.tooBig': 'El archivo supera 30MB, rechazado',
      'toast.theme': 'Tema: {0}', 'toast.size': 'Tamaño de botón: {0}', 'toast.lang': 'Idioma: {0}',
      'btn.copy': 'Copiar', 'btn.clear': 'Vaciar', 'btn.download': 'Descargar', 'btn.open': 'Abrir', 'btn.sample': 'Ejemplo'
    },
    fr: {
      brand: 'Boîte à outils du développeur', nav: 'Changer d’outil', 'tip.settings': 'Paramètres', 'tip.theme': 'Thème de couleurs (mémorisé)', 'aria.theme': 'Thème de couleurs',
      'set.size': 'Taille des boutons de la barre', 'set.lang': 'Langue de l’interface', 'set.remember': '· le choix est mémorisé automatiquement',
      'size.sm': 'Petit', 'size.md': 'Moyen', 'size.lg': 'Grand', 'size.xl': 'Très grand', 'size.tip': '{0}px de haut · police {1}px', 'size.def': ' (par défaut)',
      'toast.copied': '{0} copié', 'toast.copyFail': 'Échec de la copie, sélectionnez manuellement', 'toast.noCopy': 'Rien à copier',
      'toast.noDl': 'Rien à télécharger', 'toast.dl': 'Téléchargement lancé', 'toast.empty': 'Aucun contenu', 'toast.cleared': 'Effacé',
      'toast.loaded': '{0} chargé', 'toast.readFail': 'Impossible de lire le fichier', 'toast.tooBig': 'Le fichier dépasse 30 Mo et a été refusé',
      'toast.theme': 'Thème : {0}', 'toast.size': 'Taille des boutons : {0}', 'toast.lang': 'Langue : {0}',
      'btn.copy': 'Copier', 'btn.clear': 'Effacer', 'btn.download': 'Télécharger', 'btn.open': 'Ouvrir', 'btn.sample': 'Exemple'
    },
    de: {
      brand: 'Entwickler-Toolbox', nav: 'Werkzeug wechseln', 'tip.settings': 'Einstellungen', 'tip.theme': 'Farbschema (wird gemerkt)', 'aria.theme': 'Farbschema',
      'set.size': 'Größe der Werkzeugleisten-Buttons', 'set.lang': 'Sprache', 'set.remember': '· wird automatisch gemerkt',
      'size.sm': 'Klein', 'size.md': 'Mittel', 'size.lg': 'Groß', 'size.xl': 'Sehr groß', 'size.tip': '{0}px hoch · {1}px Schrift', 'size.def': ' (Standard)',
      'toast.copied': '{0} kopiert', 'toast.copyFail': 'Kopieren fehlgeschlagen, bitte manuell auswählen', 'toast.noCopy': 'Nichts zu kopieren',
      'toast.noDl': 'Nichts zu speichern', 'toast.dl': 'Download gestartet', 'toast.empty': 'Kein Inhalt', 'toast.cleared': 'Geleert',
      'toast.loaded': '{0} geladen', 'toast.readFail': 'Datei konnte nicht gelesen werden', 'toast.tooBig': 'Datei größer als 30MB, abgelehnt',
      'toast.theme': 'Schema: {0}', 'toast.size': 'Button-Größe: {0}', 'toast.lang': 'Sprache: {0}',
      'btn.copy': 'Kopieren', 'btn.clear': 'Leeren', 'btn.download': 'Speichern', 'btn.open': 'Öffnen', 'btn.sample': 'Beispiel'
    }
  };

  const root = document.documentElement;
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* 存储不可用时仅本次生效 */ } }
  };

  // 繁体地区识别为 zh-TW，其余中文为 zh-CN，未匹配时用英文
  function detectLang() {
    const prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (const p of prefs) {
      const full = String(p);
      if (COMMON[full]) return full;
      const base = full.toLowerCase().split('-')[0];
      if (base === 'zh') return /(^|-)(tw|hk|mo|hant)(-|$)/i.test(full) ? 'zh-TW' : 'zh-CN';
      if (COMMON[base]) return base;
    }
    return 'en';
  }

  const knownTheme = (id) => (THEMES.some(([v]) => v === id) ? id : THEMES[0][0]);
  const knownSize = (id) => (SIZES[id] ? id : 'md');
  const knownLang = (id) => (COMMON[id] ? id : detectLang());

  // 脚本在 <head> 中同步执行：首屏绘制前就应用偏好，避免闪烁
  root.setAttribute('data-theme', knownTheme(store.get(KEYS.theme)));
  root.setAttribute('data-size', knownSize(store.get(KEYS.size)));
  const initialLang = knownLang(store.get(KEYS.lang));
  root.setAttribute('data-lang', initialLang);
  root.lang = initialLang;

  const style = document.createElement('style');
  style.textContent = [
    '.tool-tabs{display:flex;align-items:center;gap:2px;flex:1 1 auto;min-width:0;margin-left:-6px;overflow-x:auto;scrollbar-width:none}',
    '.tool-tabs::-webkit-scrollbar{display:none}',
    '.tool-tab{display:inline-flex;align-items:center;gap:6px;flex:0 0 auto;height:26px;padding:0 10px;border-radius:6px;',
    'color:var(--muted);font-size:13px;line-height:1;text-decoration:none;white-space:nowrap;transition:background .15s,color .15s}',
    '.tool-tab svg{width:15px;height:15px;flex:0 0 auto}',
    '.tool-tab:hover{background:var(--hover);color:var(--text)}',
    '.tool-tab:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}',
    '.tool-tab[aria-current="page"]{background:var(--hover);color:var(--text);font-weight:600}',
    '.tool-tab[aria-current="page"] svg{color:var(--accent)}'
  ].join('');
  document.head.appendChild(style);

  const pick = (map, lang) => map[lang] || map.en || map['zh-CN'];
  const format = (s, args) => String(s).replace(/\{(\d+)\}/g, (m, i) => (args[i] !== undefined ? args[i] : m));

  function fmtBytes(n) {
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
    return (n / 1024 / 1024).toFixed(2) + ' MB';
  }
  const byteLen = (s) => new Blob([s]).size;

  function icon(paths) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    paths.forEach((d) => {
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', d);
      svg.appendChild(path);
    });
    return svg;
  }

  // 页面切换语言后再次调用即可刷新文案；当前页由 nav 的 data-current 指定
  function renderTabs(nav) {
    if (!nav) return;
    const lang = root.lang;
    nav.setAttribute('aria-label', pick(COMMON, lang).nav);
    nav.replaceChildren(...TOOLS.map((tool) => {
      const a = document.createElement('a');
      a.className = 'tool-tab';
      a.href = tool.href;
      if (tool.id === nav.dataset.current) a.setAttribute('aria-current', 'page');
      const label = document.createElement('span');
      label.textContent = pick(tool.name, lang);
      a.append(icon(tool.icon), label);
      return a;
    }));
  }

  const PALETTE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c.95 0 1.6-.72 1.6-1.6 0-.44-.18-.83-.44-1.14-.26-.32-.42-.7-.42-1.1 0-.95.76-1.7 1.7-1.7h1.72A5.24 5.24 0 0 0 21.4 10C21.4 5.9 17.4 3 12 3z"/><circle cx="7.6" cy="11.6" r="1.15" fill="currentColor" stroke="none"/><circle cx="10.4" cy="7.6" r="1.15" fill="currentColor" stroke="none"/><circle cx="15.2" cy="8.2" r="1.15" fill="currentColor" stroke="none"/></svg>';
  const GEAR_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>';

  /**
   * 初始化一个工具页：渲染标题栏切换按钮与右侧主题/设置，处理 data-i18n 文案。
   * 页面需提供 <nav class="tool-tabs" id="toolTabs" data-current="..."> 和 <div class="titlebar-right" id="toolboxControls">。
   * text 为页面自己的 8 语言词典，缺失的键依次回退到英文、简体中文和公共词典。
   * onLang 只在用户切换语言后调用；首次渲染由页面在 initPage 返回后自行完成。
   */
  function initPage(opts) {
    const text = opts.text || {};
    const tool = TOOLS.find((t) => t.id === opts.current);
    let lang = root.lang;
    let toastTimer = null;

    function tr(key, ...args) {
      const own = (text[lang] && text[lang][key]) ?? (text.en && text.en[key]) ?? (text['zh-CN'] && text['zh-CN'][key]);
      const value = own ?? pick(COMMON, lang)[key] ?? COMMON.en[key] ?? key;
      return format(value, args);
    }

    const controls = document.getElementById('toolboxControls');
    controls.innerHTML =
      '<span class="theme-pick">' + PALETTE_SVG + '<select id="tbTheme"></select></span>' +
      '<span class="settings-wrap"><button type="button" class="settings-btn" id="tbSettings" aria-haspopup="dialog" aria-expanded="false">' + GEAR_SVG + '</button>' +
      '<div class="settings-pop" id="tbSettingsPop" hidden role="dialog">' +
      '<div class="set-title" data-i18n="set.size"></div><div class="size-seg" id="tbSizeSeg"></div>' +
      '<div class="set-title set-title-2" data-i18n="set.lang"></div><select class="lang-sel" id="tbLang"></select>' +
      '<div class="set-hint" data-i18n="set.remember"></div></div></span>';
    const selTheme = document.getElementById('tbTheme');
    const btnSettings = document.getElementById('tbSettings');
    const pop = document.getElementById('tbSettingsPop');
    const sizeSeg = document.getElementById('tbSizeSeg');
    const selLang = document.getElementById('tbLang');
    THEMES.forEach(([value, label]) => selTheme.add(new Option(label, value)));
    LANGS.forEach(([value, label]) => selLang.add(new Option(label, value)));
    Object.keys(SIZES).forEach((id) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.size = id;
      sizeSeg.appendChild(b);
    });
    selTheme.value = root.getAttribute('data-theme');
    selLang.value = lang;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 1400);
    }

    function refreshSizes() {
      const current = root.getAttribute('data-size');
      sizeSeg.querySelectorAll('button').forEach((b) => {
        const px = SIZES[b.dataset.size];
        b.textContent = tr('size.' + b.dataset.size);
        b.classList.toggle('on', b.dataset.size === current);
        b.title = tr('size.tip', px[0], px[1]) + (b.dataset.size === 'md' ? tr('size.def') : '');
      });
    }

    function applyLang(id, initial) {
      lang = knownLang(id);
      root.lang = lang;
      root.setAttribute('data-lang', lang);
      selLang.value = lang;
      document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = tr(el.dataset.i18n); });
      document.querySelectorAll('[data-i18n-title]').forEach((el) => { el.title = tr(el.dataset.i18nTitle); });
      document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = tr(el.dataset.i18nPh); });
      document.querySelectorAll('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', tr(el.dataset.i18nAria)); });
      selTheme.title = tr('tip.theme');
      selTheme.setAttribute('aria-label', tr('aria.theme'));
      btnSettings.title = tr('tip.settings');
      btnSettings.setAttribute('aria-label', tr('tip.settings'));
      pop.setAttribute('aria-label', tr('tip.settings'));
      selLang.setAttribute('aria-label', tr('set.lang'));
      refreshSizes();
      renderTabs(document.getElementById('toolTabs'));
      document.title = tool && tool.id !== 'home' ? pick(tool.name, lang) + ' · ' + tr('brand') : tr('brand');
      if (opts.onLang && !initial) opts.onLang(lang);
      root.classList.remove('i18n-pending');
    }

    const closeSettings = () => {
      pop.hidden = true;
      btnSettings.classList.remove('on');
      btnSettings.setAttribute('aria-expanded', 'false');
    };
    btnSettings.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = pop.hidden;
      pop.hidden = !open;
      btnSettings.classList.toggle('on', open);
      btnSettings.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => { if (!pop.hidden && !pop.contains(e.target)) closeSettings(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !pop.hidden) closeSettings(); });

    selTheme.addEventListener('change', () => {
      root.setAttribute('data-theme', knownTheme(selTheme.value));
      store.set(KEYS.theme, selTheme.value);
      showToast(tr('toast.theme', selTheme.options[selTheme.selectedIndex].text));
    });
    sizeSeg.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-size]');
      if (!b) return;
      root.setAttribute('data-size', b.dataset.size);
      store.set(KEYS.size, b.dataset.size);
      refreshSizes();
      showToast(tr('toast.size', tr('size.' + b.dataset.size)));
    });
    selLang.addEventListener('change', () => {
      store.set(KEYS.lang, selLang.value);
      applyLang(selLang.value);
      showToast(tr('toast.lang', selLang.options[selLang.selectedIndex].text));
    });

    function fallbackCopy(value) {
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.style.cssText = 'position:fixed;top:-1000px';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      return ok;
    }

    function copy(value) {
      if (!value) { showToast(tr('toast.noCopy')); return; }
      const done = () => showToast(tr('toast.copied', fmtBytes(byteLen(value))));
      const fail = () => (fallbackCopy(value) ? done() : showToast(tr('toast.copyFail')));
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(value).then(done, fail);
      else fail();
    }

    function download(data, filename, type) {
      const blob = data instanceof Blob ? data : new Blob([data], { type: type || 'text/plain;charset=utf-8' });
      if (!blob.size) { showToast(tr('toast.noDl')); return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast(tr('toast.dl'));
    }

    applyLang(lang, true);
    return { tr, toast: showToast, copy, download, get lang() { return lang; } };
  }

  // 静态文案是中文，非中文界面先隐藏到 initPage 填完文案；1.5s 兜底防止脚本出错时白屏
  if (initialLang !== 'zh-CN') {
    root.classList.add('i18n-pending');
    setTimeout(() => root.classList.remove('i18n-pending'), 1500);
  }

  window.Toolbox = { tools: TOOLS, pick, icon, renderTabs, initPage, fmtBytes, byteLen, detectLang };
})();
