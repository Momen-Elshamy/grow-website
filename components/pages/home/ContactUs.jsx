import { Form, Input, Select, Button, Row, Col, Divider } from "antd";
import styles from "./ContactUs.module.css";
import Uicons from "@/components/UI/Uicons";

const { TextArea } = Input;
const { Option } = Select;

export default function ContactUs() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
    // Handle form submission here
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <Row gutter={[40, 40]}>
          {/* Left Column - Contact Information */}
          <Col xs={24} md={9}>
            <div className={styles.leftContent}>
              <h2 className={styles.heading}>
                If you have any questions or you'd like to find out more about
                our services, please get in touch!
              </h2>

              <div className={styles.contactInfo}>
                {/* Quick Contact */}
                <div className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <Uicons icon="fi-rr-envelope" />
                  </div>
                  <div className={styles.contactDetails}>
                    <h3 className={styles.contactTitle}>Quick Contact</h3>
                    <p className={styles.contactText}>Agritec@7oroof.com</p>
                    <p className={styles.contactText}>+2 011 6114 5741</p>
                  </div>
                </div>

                <Divider style={{ margin: "0" }} />

                {/* Our Location */}
                <div className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <Uicons icon="fi-rr-marker" />
                  </div>
                  <div className={styles.contactDetails}>
                    <h3 className={styles.contactTitle}>Our Location</h3>
                    <p className={styles.contactText}>
                      Great Kings 2307 Beverley Road, Brooklyn, NY 145784
                    </p>
                  </div>
                </div>

                <Divider style={{ margin: "0" }} />

                {/* Working Hours */}
                <div className={styles.contactItem}>
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
                </div>
              </div>
            </div>
          </Col>

          {/* Right Column - Contact Form */}
          <Col xs={24} md={15}>
            <div className={styles.formContainer}>
              <h2 className={styles.formHeading}>
                Just fill out the form and our global experts will be in touch
                right away with the right methods and price to help you!
              </h2>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className={styles.contactForm}
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input placeholder="Your Name" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input placeholder="Email Address" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="company"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your company name",
                        },
                      ]}
                    >
                      <Input placeholder="Company Name" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number",
                        },
                      ]}
                    >
                      <Input placeholder="Phone Number" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="propertySize"
                      rules={[
                        {
                          required: true,
                          message: "Please select property size",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Property size (hectares)"
                        size="large"
                        suffixIcon={<Uicons icon="fi-rr-angle-small-down" />}
                        className={styles.select}
                        styles={{
                          placeholder: { color: "#63836f" },
                        }}
                      >
                        <Option value="small" className={styles.selectOption}>
                          Small (0-5 hectares)
                        </Option>
                        <Option value="medium" className={styles.selectOption}>
                          Medium (5-20 hectares)
                        </Option>
                        <Option value="large" className={styles.selectOption}>
                          Large (20-50 hectares)
                        </Option>
                        <Option value="xlarge" className={styles.selectOption}>
                          Extra Large (50+ hectares)
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="aiIntegration"
                      rules={[
                        {
                          required: true,
                          message: "Please select AI integration solution",
                        },
                      ]}
                    >
                      <Select
                        placeholder="AI Integration solutions"
                        size="large"
                        suffixIcon={<Uicons icon="fi-rr-angle-small-down" />}
                        className={styles.select}
                        styles={{
                          placeholder: { color: "#63836f" },
                        }}
                      >
                        <Option value="basic" className={styles.selectOption}>
                          Basic AI Integration
                        </Option>
                        <Option
                          value="advanced"
                          className={styles.selectOption}
                        >
                          Advanced AI Solutions
                        </Option>
                        <Option value="custom" className={styles.selectOption}>
                          Custom AI Development
                        </Option>
                        <Option
                          value="consultation"
                          className={styles.selectOption}
                        >
                          AI Consultation
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
                  ]}
                >
                  <TextArea
                    rows={6}
                    placeholder="Kindly provide enough information about your farm business..."
                    showCount
                    maxLength={1000}
                    className={styles.textarea}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className={`${styles.submitButton} ctaButton`}
                    icon={<Uicons icon="fi-rr-arrow-small-right" />}
                    iconPosition="end"
                  >
                    Submit Request
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
