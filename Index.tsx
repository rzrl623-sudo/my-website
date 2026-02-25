import { useEffect, useRef, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/972526178430?text=%D7%94%D7%99%D7%99%20%D7%A8%D7%96%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%D7%9A%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%A9%D7%A0%D7%93%D7%91%D7%A8%20%D7%95%D7%A0%D7%A8%D7%90%D7%94%20%D7%90%D7%9D%20%D7%9E%D7%AA%D7%90%D7%99%D7%9D%20%D7%9C%D7%A0%D7%95%20%D7%9C%D7%A2%D7%91%D7%95%D7%93%20%D7%91%D7%99%D7%97%D7%93";

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fade-in-up");
          el.classList.remove("opacity-0");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useFadeIn();
  return (
    <section id={id} ref={ref} className={`opacity-0 py-16 md:py-24 px-6 ${className}`}>
      <div className="mx-auto max-w-[680px]">{children}</div>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 leading-tight">{children}</h2>;
}

function CtaButton({ variant = "primary" }: { variant?: "primary" | "outline" }) {
  const base =
    "inline-block rounded-lg px-8 py-4 text-lg font-sans font-medium transition-colors duration-200 text-center";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:opacity-90"
      : "border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary";
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
      בוא נדבר בוואטסאפ ונראה אם אני יכול לעזור לך ←
    </a>
  );
}

function StickyWhatsApp({ hidden }: { hidden: boolean }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 left-5 z-50 md:hidden bg-primary text-primary-foreground rounded-full px-5 py-3 text-sm font-sans font-medium shadow-lg transition-all duration-300 ${hidden ? "translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
    >
      דברו איתי בוואטסאפ
    </a>
  );
}

export default function Index() {
  const [hideSticky, setHideSticky] = useState(false);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = finalCtaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHideSticky(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load external form script
  useEffect(() => {
    const container = document.getElementById("signup-form");
    if (!container) return;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//form2.ravpage.co.il/b6ecbac6523247c8694bf91b48f88139699E9A54?__loveable__=true";
    script.charset = "UTF-8";
    container.appendChild(script);
  }, []);

  return (
    <main className="font-sans text-foreground leading-relaxed" style={{ lineHeight: 1.75 }}>
      {/* Section 1 — Hero */}
      <Section className="pt-20 md:pt-32">
        <p className="font-serif text-4xl md:text-5xl font-bold mb-2">רז טל</p>
        <p className="text-muted-foreground text-base md:text-lg tracking-wide mb-6">
          מהנדס הרווח לקליניקות פרטיות
        </p>
        <div className="w-12 h-px bg-border mb-10" />
        <h1 className="font-serif text-3xl md:text-[2.6rem] font-bold leading-tight mb-6">
          אני עוזר לבעלי קליניקות לקבל
          <br />
          לידים איכותיים ובאמת לסגור אותם.
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
          לא לידים שבודקים מחיר ונעלמים.
          <br />
          לא לידים שלא מגיעים לפגישה.
          <br />
          לידים שיושבים על הכיסא ומשלמים.
        </p>
        <CtaButton />
      </Section>

      {/* Section 2 — Problem */}
      <Section>
        <SectionTitle>נשמע מוכר?</SectionTitle>
        <div className="space-y-6 text-lg">
          <p>
            אתה משקיע אלפי שקלים בחודש בפרסום.
            <br />
            הלידים מגיעים — אבל חצי מהם רק בודקים מחיר ונעלמים.
            <br />
            חלק לא רלוונטיים בכלל למיקום או לטיפול.
            <br />
            ואלה שכן קובעים? חלק פשוט לא מגיעים.
          </p>
          <p>
            בסוף אתה מוצא את עצמך מנהל מוקד טלפוני
            <br />
            במקום לעשות את מה שאתה באמת טוב בו — לטפל.
          </p>
          <p>
            והכי מתסכל?
            <br />
            שילמת לסוכנות, לא הבנת מה הם עשו,
            <br />
            והתוצאות לא הצדיקו את ההשקעה.
          </p>
        </div>
      </Section>

      {/* Section 3 — Solution */}
      <Section>
        <SectionTitle>מה אני עושה אחרת</SectionTitle>
        <div className="space-y-6 text-lg">
          <p>
            אני לא מביא &quot;הרבה לידים&quot;.
            <br />
            אני בונה מערך פרסום שמסנן את מי שלא רציני
            <br />
            עוד לפני שהוא משאיר פרטים.
          </p>
          <p>
            אני מכניס לקליניקה שלך את סדרת הסינון שבניתי
            <br />
            שתדאג שמי שמגיע אליך לטלפון הוא רלוונטי.
          </p>
          <p className="font-medium">התוצאה: פחות לידים, הרבה יותר סגירות.</p>
        </div>
      </Section>

      {/* Section 4 — Case Study 1 */}
      <Section>
        <SectionTitle>תוצאות מהשטח — בשביל שתבין שאני לא מדבר באוויר</SectionTitle>
        <div className="bg-card rounded-xl p-8 md:p-12">
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8 font-sans">
            CASE STUDY — קליניקה דנטלית, שיקום פה מלא
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <p className="font-serif text-2xl md:text-3xl font-bold text-primary">₪52.9</p>
              <p className="text-sm text-muted-foreground mt-1">עלות ליד</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl md:text-3xl font-bold text-primary">22%</p>
              <p className="text-sm text-muted-foreground mt-1">אחוז סגירה לפגישת ייעוץ בתשלום</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl md:text-3xl font-bold text-primary">&lt;₪100</p>
              <p className="text-sm text-muted-foreground mt-1">התחייבות — מעל זה, לא משלמים</p>
            </div>
          </div>
          <div className="space-y-4 text-base">
            <p>
              קליניקה דנטלית שהגיעה אליי אחרי שעבדה עם כמה חברות שיווק.
              <br />
              הבעיה: לידים שלא סגרו — או בכלל לא הגיעו.
            </p>
            <p>
              בניתי מערך פרסום ממוקד שסינן לידים לא רלוונטיים מראש.
              <br />
              התוצאה: לידים ב-52.9 שקל, עם 22% סגירה לפגישת ייעוץ ראשונה בתשלום.
            </p>
          </div>
        </div>
      </Section>

      {/* Section 5 — Case Study 2 */}
      <Section>
        <div className="bg-card rounded-xl p-8 md:p-12">
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8 font-sans">
            CASE STUDY — קליניקה דנטלית, ראשון לציון
          </p>
          <div className="space-y-4 text-base mb-8">
            <p>
              קליניקה דנטלית בראשון לציון שקיבלה מעל 500 לידים.
              <br />
              יותר מחצי מהם היו לא רלוונטיים בכלל.
              <br />
              ואלה שכן היו רלוונטיים? הגיעו רק לבדוק מחיר — ונעלמו.
            </p>
            <p>
              אחרי שעשינו כמה שינויים?
              <br />
              זה מה שהבעלים של הקליניקה שלח לי
              <br />
              עוד לפני שסיימנו את החודש הראשון:
            </p>
          </div>
          <div className="flex justify-center mb-4">
            <div
              id="case-study-screenshot"
              className="w-full max-w-md rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm py-20 shadow-sm"
            >
              תמונה תתווסף בקרוב
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground">סקרינשוט מוואטסאפ — בהסכמת הלקוח</p>
        </div>
      </Section>

      {/* Section 6 — Risk Reversal */}
      <Section>
        <SectionTitle>ההתחייבות שלי</SectionTitle>
        <div className="space-y-6 text-lg">
          <p>
            אם אני לא מגיע לעלות ליד איכותי,
            <br />
            שעונה לטלפון ועבר את הסינון שלי,
            <br />
            של פחות מ-100 שקל — אתה לא משלם.
          </p>
          <p>
            אם אתה עושה מה שאני אומר
            <br />
            ואני לא מגיע לתוצאה שהבטחתי לך —
            <br />
            אתה לא משלם לי.
          </p>
          <p>
            בלי חוזים ארוכים. בלי &quot;תן לזה זמן&quot;.
            <br />
            או שזה עובד, או שזה עליי.
          </p>
        </div>
      </Section>

      {/* Section 7 — Beyond Leads */}
      <Section>
        <SectionTitle>לידים איכותיים זה רק ההתחלה</SectionTitle>
        <div className="space-y-6 text-lg">
          <p>
            הלידים מגיעים טובים ורלוונטיים אבל הסגירות עדיין לא שם?
            <br />
            אני יודע לעזור גם בצד המכירה — מה להגיד בשיחה הראשונה,
            <br />
            איך לטפל בהתנגדויות מחיר, ואיך להפוך פנייה לטיפול סגור.
          </p>
          <p>
            מעבר לזה, אם צריך אני בונה יחד איתך אסטרטגיית גיוס לקוח שלמה:
            <br />
            מה להדגיש בפגישת הייעוץ, מה לא לעשות,
            <br />
            ואיך לתמחר את הפגישה הראשונה כדי שתסנן רציניים מסקרנים.
          </p>
          <p>
            השורה התחתונה: אני לא נעלם אחרי שהליד נכנס.
            <br />
            אני איתך עד שהוא משלם.
          </p>
        </div>
      </Section>

      {/* Section 8 — Who Is This For */}
      <Section>
        <SectionTitle>למי זה מתאים?</SectionTitle>
        <div className="space-y-6 text-lg">
          <p>
            קליניקות פרטיות עם טיפולים בשווי ₪10,000 ומעלה:
            <br />
            שיקום פה מלא ושתלים, אורתודונטיה למבוגרים,
            <br />
            ניתוחים פלסטיים, אסתטיקה רפואית מתקדמת,
            <br />
            ניתוחים בריאטריים, טיפולי פוריות ו-IVF.
          </p>
          <p>
            אני עובד עם קליניקה אחת בכל תחום בכל אזור.
            <br />
            לא עם מתחרים.
          </p>
        </div>
      </Section>

      {/* Section 9 — Lead Magnet */}
      <Section className="bg-card">
        <SectionTitle>רוצה להבין כמה הלידים שאתה מקבל כרגע באמת איכותיים?</SectionTitle>
        <p className="text-lg text-muted-foreground mb-10">
          השאר פרטים ותקבל גישה לאפליקציית אבחון עצמי —
          <br />
          כלי פשוט שבודק בדיוק מה עלות הליד האמיתית שלך,
          <br />
          מה אחוז הסגירה, ואיפה אתה מפסיד כסף בלי לדעת.
        </p>
        <div id="signup-form" className="min-h-[200px]" />
      </Section>

      {/* Section 10 — Final CTA */}
      <div ref={finalCtaRef}>
        <section id="final-cta" className="bg-primary text-primary-foreground py-16 md:py-24 px-6">
          <div className="mx-auto max-w-[680px] text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              רוצה לראות אם זה מתאים לקליניקה שלך?
            </h2>
            <p className="text-lg opacity-90 mb-10">
              שיחה של 10 דקות, בלי התחייבות.
              <br />
              אם אני יכול לעזור — נמשיך. אם לא — לפחות תקבל תובנה שתעזור לך.
            </p>
            <CtaButton variant="outline" />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-6 text-center text-sm opacity-80 border-t border-primary-foreground/10">
        רז טל | מהנדס הרווח לקליניקות פרטיות
        <br />
        © 2025
      </footer>

      {/* Sticky WhatsApp — mobile only */}
      <StickyWhatsApp hidden={hideSticky} />
    </main>
  );
}
