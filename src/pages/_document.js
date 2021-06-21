import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';
import { withPrefix } from '../utils';
import { GA_TRACKING_ID } from '../../lib/gtag'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        // see https://github.com/nfl/react-helmet#server-usage for more information
        // 'head' was occupied by 'renderPage().head', we cannot use it
        return { ...initialProps, helmet: Helmet.renderStatic() };
    }

    // should render on <html>
    get helmetHtmlAttrComponents() {
        return this.props.helmet.htmlAttributes.toComponent();
    }

    // should render on <body>
    get helmetBodyAttrComponents() {
        return this.props.helmet.bodyAttributes.toComponent();
    }

    // should render on <head>
    get helmetHeadComponents() {
        return Object.keys(this.props.helmet)
            .filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
            .map((el) => this.props.helmet[el].toComponent());
    }

    render() {
        // if you don't like Helmet but you still want to set properties on body use this
        // const pageProps = _.get(this.props, '__NEXT_DATA__.props.pageProps');
        return (
            <Html {...this.helmetHtmlAttrComponents}>
                <Head>
                <meta name="google-site-verification" content="Vx_lESFtli-lf4dBEeoZIhJv5aMClv8kBBZAzrm1sVA" />
                {this.helmetHeadComponents}
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-199953511-1">
                </script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'UA-199953511-1');
                    gtag('config', 'AW-347510295');
                    gtag('config', 'AW-347510295/3BVCCKUFEJes2qUB', {
                    'phone_conversion_number': '5552134270'
                });
                </script>
                <script
                        dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                        });
                    `,
                        }}
                />
                </Head>
                <body {...this.helmetBodyAttrComponents}>
                    <Main />
                    <script src={withPrefix('js/plugins.js')} />

                    <NextScript />
                </body>
            </Html>
        );
    }
}