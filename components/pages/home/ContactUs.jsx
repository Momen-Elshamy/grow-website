import { Form, Input, Select, Button, Row, Col, Divider, message } from "antd";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "./ContactUs.module.css";
import Uicons from "@/components/UI/Uicons";
import CustomButton from "@/components/UI/Button";

const { TextArea } = Input;
const { Option } = Select;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const leftContentVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const rightContentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const contactItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: "easeOut",
    },
  },
};

export default function ContactUs() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
          services: values.services,
          courses: values.courses,
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
        message.success(
          "Form submitted successfully! We'll get back to you soon."
        );
        form.resetFields();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className={styles.contactSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={styles.backgroundImageWrapper}>
        <Image
          src="/images/bg-contact.webp"
          alt="Contact background"
          fill
          className={styles.backgroundImage}
          priority
          quality={90}
        />
      </div>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <Row gutter={[32, 32]}>
          {/* Left Column - Contact Information */}
          <Col md={24} lg={10}>
            <motion.div
              className={styles.leftContent}
              variants={leftContentVariants}
            >
              <motion.h2 className={styles.heading} variants={headingVariants}>
                If you have any questions or you'd like to find out more about
                our services, please get in touch!
              </motion.h2>

              <motion.div
                className={styles.contactInfo}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Quick Contact */}
                <motion.div
                  className={styles.contactItem}
                  variants={contactItemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className={styles.iconWrapper}>
                    <Uicons icon="fi-rr-newsletter-subscribe" />
                  </div>
                  <div className={styles.contactDetails}>
                    <h3 className={styles.contactTitle}>Quick Contact</h3>
                    <p className={styles.contactText}>info@growegypt.com</p>
                    <p className={styles.contactText}>01080200887</p>
                  </div>
                </motion.div>

                <Divider style={{ margin: "0" }} />

                {/* Our Location */}
                <motion.div
                  className={styles.contactItem}
                  variants={contactItemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className={styles.iconWrapper}>
                    <Uicons icon="fi-rr-land-layer-location" />
                  </div>
                  <div className={styles.contactDetails}>
                    <h3 className={styles.contactTitle}>Our Location</h3>
                    <p className={styles.contactText}>
                      Smart village, linx building, office A105
                    </p>
                  </div>
                </motion.div>

                <Divider style={{ margin: "0" }} />

                {/* Working Hours */}
                <motion.div
                  className={styles.contactItem}
                  variants={contactItemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className={styles.iconWrapper}>
                    <Uicons icon="fi-rr-clock" />
                  </div>
                  <div className={styles.contactDetails}>
                    <h3 className={styles.contactTitle}>Working Hours</h3>
                    <p className={styles.contactText}>
                      Mon - Fri: 8.00am - 18.00pm
                    </p>
                    <p className={styles.contactText}>Sat: 9.00am - 17.00pm</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </Col>

          {/* Right Column - Contact Form */}
          <Col md={24} lg={14}>
            <motion.div
              className={styles.formContainer}
              variants={rightContentVariants}
            >
              <motion.h2
                className={styles.formHeading}
                variants={headingVariants}
              >
                Just fill out the form and our global experts will be in touch
                right away with the right methods and price to help you!
              </motion.h2>

              <motion.div variants={formVariants}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  className={styles.contactForm}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="name"
                        rules={[
                          { required: true, message: "Please enter your name" },
                          {
                            min: 2,
                            message: "Name must be at least 2 characters",
                          },
                          {
                            max: 100,
                            message: "Name must not exceed 100 characters",
                          },
                          {
                            whitespace: true,
                            message: "Name cannot be only whitespace",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Your Name"
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
                            message: "Please enter your email",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email address",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Email Address"
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
                            message: "Please enter your company name",
                          },
                          {
                            min: 2,
                            message:
                              "Company name must be at least 2 characters",
                          },
                          {
                            max: 200,
                            message:
                              "Company name must not exceed 200 characters",
                          },
                          {
                            whitespace: true,
                            message: "Company name cannot be only whitespace",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Company Name"
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
                            message: "Please enter your phone number",
                          },
                          {
                            pattern: /^[\d\s\-\+\(\)]+$/,
                            message: "Please enter a valid phone number",
                          },
                          {
                            min: 8,
                            message: "Phone number must be at least 8 digits",
                          },
                          {
                            max: 20,
                            message:
                              "Phone number must not exceed 20 characters",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Phone Number"
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
                          placeholder="Property size (Acre)"
                          size="large"
                          suffixIcon={<Uicons icon="fi-rr-angle-small-down" />}
                          className={styles.select}
                          dropdownStyle={{
                            backgroundColor: "white",
                            border: "none",
                          }}
                          styles={{
                            placeholder: { color: "#c9c9c9" },
                          }}
                        >
                          <Option value="500" className={styles.selectOption}>
                            500 Acre
                          </Option>
                          <Option value="1000" className={styles.selectOption}>
                            1000 Acre
                          </Option>
                          <Option value="2000" className={styles.selectOption}>
                            2000 Acre
                          </Option>
                          <Option value="4000" className={styles.selectOption}>
                            4000 Acre
                          </Option>
                          <Option value="8000" className={styles.selectOption}>
                            8000 Acre
                          </Option>
                          <Option value="10000" className={styles.selectOption}>
                            10000 Acre
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        name="services"
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                      >
                        <Select
                          placeholder="Services"
                          size="large"
                          suffixIcon={<Uicons icon="fi-rr-angle-small-down" />}
                          className={styles.select}
                          dropdownStyle={{
                            backgroundColor: "white",
                            border: "none",
                          }}
                          styles={{
                            placeholder: { color: "#c9c9c9" },
                          }}
                        >
                          <Option
                            value="Technical Consultancy"
                            className={styles.selectOption}
                          >
                            Technical Consultancy
                          </Option>
                          <Option
                            value="Lab analysis/Eurofins"
                            className={styles.selectOption}
                          >
                            Lab analysis/Eurofins
                          </Option>
                          <Option
                            value="Training Course"
                            className={styles.selectOption}
                          >
                            Training Course
                          </Option>
                          <Option
                            value="Engineering & design of Irrigation and drainage systems."
                            className={styles.selectOption}
                          >
                            Engineering & design of Irrigation and drainage
                            systems.
                          </Option>
                          <Option
                            value="Revision, Re-engineering and optimization of existing water systems."
                            className={styles.selectOption}
                          >
                            Revision, Re-engineering and optimization of
                            existing water systems.
                          </Option>
                          <Option
                            value="Remote sensing"
                            className={styles.selectOption}
                          >
                            Remote sensing
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="courses"
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                      >
                        <Select
                          placeholder="Courses"
                          size="large"
                          suffixIcon={<Uicons icon="fi-rr-angle-small-down" />}
                          className={styles.select}
                          dropdownStyle={{
                            backgroundColor: "white",
                            border: "none",
                          }}
                          styles={{
                            placeholder: { color: "#c9c9c9" },
                          }}
                        >
                          <Option
                            value="Advancing vertical farming with urban crop solutions"
                            className={styles.selectOption}
                          >
                            Advancing vertical farming with urban crop solutions
                          </Option>
                          <Option
                            value="Controlled environment in agriculture growing"
                            className={styles.selectOption}
                          >
                            Controlled environment in agriculture growing
                          </Option>
                          <Option
                            value="How to help farmers break their financial barriers?"
                            className={styles.selectOption}
                          >
                            How to help farmers break their financial barriers?
                          </Option>
                          <Option
                            value="Future of food production in smart new indoor farming"
                            className={styles.selectOption}
                          >
                            Future of food production in smart new indoor
                            farming
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="message"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please provide information about your farm business",
                      },
                      {
                        min: 10,
                        message: "Message must be at least 10 characters long",
                      },
                      {
                        whitespace: true,
                        message: "Message cannot be only whitespace",
                      },
                    ]}
                  >
                    <TextArea
                      rows={5}
                      placeholder="Kindly provide enough information about your farm business..."
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
                      icon={loading ? null : "fi-rr-arrow-small-right"}
                    >
                      {loading ? "Sending..." : "Submit Request"}
                    </CustomButton>
                  </Form.Item>
                </Form>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </motion.section>
  );
}
