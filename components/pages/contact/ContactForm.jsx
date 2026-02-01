import { Form, Input, Select, Row, Col, message, ConfigProvider, theme } from "antd";
import { useState, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "./ContactUs.module.css";
import Uicons from "@/components/UI/Uicons";
import CustomButton from "@/components/UI/Button";
import { useLanguage } from "@/src/contexts/LanguageContext";
import en from "@/src/translations/en/navigation";
import ar from "@/src/translations/ar/navigation";
import { PROPERTY_SIZES, SERVICE_KEYS } from "@/_data/contactUs/constants";
import {
  rightContentVariants,
  headingVariants,
  formVariants,
} from "@/_data/contactUs/animations";

const { TextArea } = Input;
const { Option } = Select;

export default function ContactForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { currentLang } = useLanguage();

  const t = useMemo(() => {
    const dict = currentLang === "ar" ? ar : en;
    return (key) => {
      const keys = key.split(".");
      let val = dict;
      for (const k of keys) {
        val = val?.[k];
      }
      return val ?? key;
    };
  }, [currentLang]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // 👇 CHANGE THIS EMAIL TO YOUR EMAIL - THAT'S IT! NO SIGNUP NEEDED!
      const YOUR_EMAIL = "mayarmohamed775@gmail.com";

      const response = await axios.post(
        `https://formsubmit.co/ajax/${YOUR_EMAIL}`,
        {
          name: values.name,
          email: values.email,
          company: values.company,
          phone: values.phone,
          propertySize: values.propertySize,
          location: values.location,
          services: values.services ? t(`servicesChildren.${values.services}`) : values.services,
          message: values.message,
          _replyto: values.email, // Replies go to form submitter
          _subject: `New Contact Form Submission from ${values.name}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        message.success(t("contactForm.successMessage"));
        form.resetFields();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(t("contactForm.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={styles.formContainer}
      variants={rightContentVariants}
    >
      <motion.h2 className={styles.formHeading} variants={headingVariants}>
        {t("contactForm.heading")}
      </motion.h2>

      <motion.div variants={formVariants}>
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              colorBgContainer: "#ffffff",
              colorTextPlaceholder: "#757575",
              colorText: "#2d583c",
              colorBorder: "#c9c9c9",
            },
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className={styles.contactForm}
          >
            {/* ... rest of your Form ... */}
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: t("contactForm.validation.nameRequired") },
                    {
                      min: 2,
                      message: t("contactForm.validation.nameMin"),
                    },
                    {
                      max: 100,
                      message: t("contactForm.validation.nameMax"),
                    },
                    {
                      whitespace: true,
                      message: t("contactForm.validation.nameWhitespace"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("contactForm.placeholderName")}
                    aria-label={t("contactForm.placeholderName")}
                    size="large"
                    className={styles.input}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: t("contactForm.validation.emailRequired"),
                    },
                    {
                      type: "email",
                      message: t("contactForm.validation.emailInvalid"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("contactForm.placeholderEmail")}
                    aria-label={t("contactForm.placeholderEmail")}
                    size="large"
                    className={styles.input}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="company"
                  rules={[
                    {
                      required: true,
                      message: t("contactForm.validation.companyRequired"),
                    },
                    {
                      min: 2,
                      message: t("contactForm.validation.companyMin"),
                    },
                    {
                      max: 200,
                      message: t("contactForm.validation.companyMax"),
                    },
                    {
                      whitespace: true,
                      message: t("contactForm.validation.companyWhitespace"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("contactForm.placeholderCompany")}
                    aria-label={t("contactForm.placeholderCompany")}
                    size="large"
                    className={styles.input}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: t("contactForm.validation.phoneRequired"),
                    },
                    {
                      pattern: /^[\d\s\-\+\(\)]+$/,
                      message: t("contactForm.validation.phoneInvalid"),
                    },
                    {
                      min: 8,
                      message: t("contactForm.validation.phoneMin"),
                    },
                    {
                      max: 20,
                      message: t("contactForm.validation.phoneMax"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("contactForm.placeholderPhone")}
                    aria-label={t("contactForm.placeholderPhone")}
                    size="large"
                    className={styles.input}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="propertySize"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Select
                    placeholder={t("contactForm.placeholderPropertySize")}
                    aria-label={t("contactForm.placeholderPropertySize")}
                    size="large"
                    suffixIcon={<Uicons icon="fi-rr-angle-small-down" />}
                    className={styles.select}
                    dropdownStyle={{
                      backgroundColor: "white",
                      border: "none",
                    }}
                  >
                    {PROPERTY_SIZES.map((size) => (
                      <Option
                        key={size}
                        value={size}
                        className={styles.selectOption}
                      >
                        {size} {t("contactForm.acre")}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="location"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input
                    placeholder={t("contactForm.placeholderLocation")}
                    aria-label={t("contactForm.placeholderLocation")}
                    size="large"
                    className={styles.input}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="services"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Select
                    placeholder={t("contactForm.placeholderServices")}
                    aria-label={t("contactForm.placeholderServices")}
                    size="large"
                    suffixIcon={<Uicons icon="fi-rr-angle-small-down" />}
                    className={styles.select}
                    dropdownStyle={{
                      backgroundColor: "white",
                      border: "none",
                    }}
                  >
                    {SERVICE_KEYS.map((key) => (
                      <Option
                        key={key}
                        value={key}
                        className={styles.selectOption}
                      >
                        {t(`servicesChildren.${key}`)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="message"
              rules={[
                {
                  required: true,
                  message: t("contactForm.validation.messageRequired"),
                },
                {
                  min: 10,
                  message: t("contactForm.validation.messageMin"),
                },
                {
                  whitespace: true,
                  message: t("contactForm.validation.messageWhitespace"),
                },
              ]}
            >
              <TextArea
                rows={5}
                placeholder={t("contactForm.placeholderMessage")}
                aria-label={t("contactForm.placeholderMessage")}
                showCount
                maxLength={1000}
                className={styles.textarea}
              />
            </Form.Item>

            <Form.Item>
              <CustomButton
                htmlType="submit"
                loading={loading}
                className={styles.submitButton}
              >
                {loading ? t("contactForm.sending") : t("contactForm.submitRequest")}
              </CustomButton>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </motion.div>
    </motion.div>
  );
}
