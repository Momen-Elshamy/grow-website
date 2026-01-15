import { Form, Input, Select, Row, Col, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "./ContactUs.module.css";
import Uicons from "@/components/UI/Uicons";
import CustomButton from "@/components/UI/Button";
import { PROPERTY_SIZES, SERVICES_OPTIONS } from "@/_data/contactUs/constants";
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
          services: values.services,
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
    <motion.div
      className={styles.formContainer}
      variants={rightContentVariants}
    >
      <motion.h2 className={styles.formHeading} variants={headingVariants}>
        Just fill out the form and our global experts will be in touch right
        away with the right methods and price to help you!
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
                    message: "Company name must be at least 2 characters",
                  },
                  {
                    max: 200,
                    message: "Company name must not exceed 200 characters",
                  },
                  {
                    whitespace: true,
                    message: "Company name cannot be only whitespace",
                  },
                ]}
              >
                <Input
                  placeholder="Company Name / Farm Owner"
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
                    message: "Phone number must not exceed 20 characters",
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
                  {PROPERTY_SIZES.map((size) => (
                    <Option
                      key={size}
                      value={size}
                      className={styles.selectOption}
                    >
                      {size} Acre
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
                  placeholder="Location (Village/City)"
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
                  {SERVICES_OPTIONS.map((service) => (
                    <Option
                      key={service}
                      value={service}
                      className={styles.selectOption}
                    >
                      {service}
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
                message: "Please provide information about your farm business",
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
              placeholder="Kindly discribe your business..."
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
              {loading ? "Sending..." : "Submit Request"}
            </CustomButton>
          </Form.Item>
        </Form>
      </motion.div>
    </motion.div>
  );
}
