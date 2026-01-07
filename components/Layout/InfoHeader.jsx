import { Row, Col } from "antd";
import Uicons from "../UI/Uicons";
import styles from "./InfoHeader.module.css";
export default function InfoHeader() {
    return (
       <div className={styles.infoHeader} >
           <Row gutter={16} justify="center" className={styles.desktopRow}>
             {/* Icons Side */}
             <Col span={12} className={`${styles.iconsContainer} ${styles.iconsContainerLeft}`}>
             <div className={styles.iconsWrapper}>
             <div className={styles.iconBox} ><Uicons icon="fi-brands-twitter" size={20} color="black" className={styles.socialIcon} /></div>
             <div className={styles.iconBox} ><Uicons icon="fi-brands-facebook" size={20} color="black" className={styles.socialIcon} /></div>
             <div className={styles.iconBox} ><Uicons icon="fi-brands-pinterest" size={20} color="black" className={styles.socialIcon} /></div>
             <div className={styles.iconBox} ><Uicons icon="fi-brands-instagram" size={20} color="black" className={styles.socialIcon} /></div>
             </div>
             <div className={styles.infoText}>
                <Uicons icon="fi-rr-phone-call" size={30} color="#107634" className={styles.infoIcon}/>
                <div className={styles.infoTextContent}>
                   <p className={styles.text}> Call anytime </p>
                   <p className={styles.info}> +98 (000) - 9630 </p>
                </div>
             </div>
             </Col>
             {/* Right Side */}
             <Col span={6} className={styles.iconsContainer}>
             <div className={styles.infoText}>
                <Uicons icon="fi-rr-newsletter-subscribe" size={30} color="#107634" className={styles.infoIcon}/>
                <div className={styles.infoTextContent}>
                   <p className={styles.text}> Send email </p>
                   <p className={styles.info}> ambed@agrios.com </p>
                </div>
             </div>
             </Col>
             <Col span={6} className={styles.iconsContainer}>
             <div className={styles.infoText}>
                <Uicons icon="fi-rr-land-layer-location" size={30} color="#107634" className={styles.infoIcon} />
                <div className={styles.infoTextContent}>
                   <p className={styles.text}> 380 St Kilda Road </p>
                   <p className={styles.info}> Melbourne, Australia </p>
                </div>
             </div>
             </Col>
          </Row>
          {/* Mobile Layout */}
          <div className={styles.mobileLayout}>
             <div className={styles.mobileInfoItem}>
                <Uicons icon="fi-rr-phone-call" size={40} color="#107634" className={styles.infoIcon} />
                <div className={styles.infoTextContent}>
                   <p className={styles.text}> Call anytime </p>
                   <p className={styles.info}> +98 (000) - 9630 </p>
                </div>
             </div>
             <div className={styles.mobileInfoItem}>
                <Uicons icon="fi-rr-newsletter-subscribe" size={40} color="#107634" className={styles.infoIcon} />
                <div className={styles.infoTextContent}>
                   <p className={styles.text}> Send email </p>
                   <p className={styles.info}> ambed@agrios.com </p>
                </div>
             </div>
             <div className={styles.mobileInfoItem}>
                <Uicons icon="fi-rr-land-layer-location" size={40} color="#107634" className={styles.infoIcon} />
                <div className={styles.infoTextContent}>
                   <p className={styles.text}> 380 St Kilda Road </p>
                   <p className={styles.info}> Melbourne, Australia </p>
                </div>
             </div>
             <div className={styles.mobileIconsWrapper}>
                <div className={styles.iconBox} ><Uicons icon="fi-brands-twitter" size={18} color="black" className={styles.socialIcon} /></div>
                <div className={styles.iconBox} ><Uicons icon="fi-brands-facebook" size={18} color="black" className={styles.socialIcon} /></div>
                <div className={styles.iconBox} ><Uicons icon="fi-brands-pinterest" size={18} color="black" className={styles.socialIcon}  /></div>
                <div className={styles.iconBox} ><Uicons icon="fi-brands-instagram" size={18} color="black" className={styles.socialIcon} /></div>
             </div>
          </div>
       </div>
    );
}