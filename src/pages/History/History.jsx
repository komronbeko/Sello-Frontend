import { useParams } from "react-router";
import ProfileNav from "../../components/ProfileNavbar/ProfileNavbar";
import "./History.scss";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { SkeletonContainer } from "../../components/SkeletonContainer/SkeletonContainer";
import Card from "../../components/Card/Card";
import NoProducts from "../../components/NoProducts/NoProducts";
import VerifyDeleting from "../../components/VerifyDeliting/VerifyDeleting";
import http from "../../service/api";
import { toast } from "react-toastify";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verifyClearing, setVerifyClearing] = useState(false);
  const { user_id } = useParams();

  async function hardDeleteAll() {
    try {
      const { data } = await http.delete("/product/hard-delete/user-products");
      toast(data.message, { type: "info" });
      fetchDeletedProducts();
      setVerifyClearing(false);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  async function fetchDeletedProducts() {
    try {
      setLoading(true);
      const { data } = await http.get("/product/deleted/one-user");
      setHistoryData(data.data);
    } catch (error) {
      toast(error.message, { type: "error" });
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchDeletedProducts();
  }, []);

  return (
    <div id="history">
      {verifyClearing ? (
        <VerifyDeleting
          verifyDeleting={hardDeleteAll}
          setVerifyModal={setVerifyClearing}
          mainText="Are you sure you want to clear your products?"
          verifyingText="Yes, I want to clear my products"
          cancelingText=" No, I do not want to clear my products"
          darkBg={true}
        />
      ) : null}
      <ProfileNav activePage={"History"} user_id={user_id} />
      <section className="history-data">
        <div className="data-head">
          <h3>My Products</h3>
          <div className="actions">
            {historyData.length ? (
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setVerifyClearing(true)}
              >
                Hard Delete All
              </Button>
            ) : null}
          </div>
        </div>
        {loading ? (
          <SkeletonContainer />
        ) : historyData.length ? (
          <div className="data-body">
            {historyData.map((el) => (
              <Card
                key={el.id}
                image={el.photos[0]?.path}
                discount={el.discount?.rate}
                id={el.id}
                price={el.price}
                title={el.name}
                is_verified={el.is_verified}
                is_owner={true}
                is_deleted={true}
                fetchDeleted={fetchDeletedProducts}
              />
            ))}
          </div>
        ) : (
          <NoProducts />
        )}
      </section>
    </div>
  );
};

export default History;
